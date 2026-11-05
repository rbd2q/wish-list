import { createHash, randomBytes } from 'node:crypto';
import config from 'config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import {
  ACCESS_COOKIE_NAME,
  ACCESS_COOKIE_OPTIONS,
  ACCESS_DURATION_SECONDS,
  ACCESS_TOKEN_AUDIENCE,
  ACCESS_TOKEN_ISSUER,
  REFRESH_COOKIE_NAME,
  REFRESH_COOKIE_OPTIONS,
  REFRESH_DURATION_MS,
  REFRESH_ROTATION_GRACE_MS,
} from '../config/session.js';
import { HttpError } from '../errors/http-error.js';
import Session from '../models/Session.js';
import User from '../models/User.js';

const hashToken = (token) => createHash('sha256').update(token).digest('hex');

const getRefreshToken = (req) => {
  const token = req.cookies[REFRESH_COOKIE_NAME];

  return typeof token === 'string' && /^[a-f0-9]{24}\.[a-f0-9]{64}$/.test(token) ? token : null;
};

const setSessionCookies = (res, userId, token, expiresAt) => {
  const access = jwt.sign({ userId: userId.toString() }, config.get('jwt_secret_key'), {
    algorithm: 'HS256',
    expiresIn: ACCESS_DURATION_SECONDS,
    issuer: ACCESS_TOKEN_ISSUER,
    audience: ACCESS_TOKEN_AUDIENCE,
  });

  res.clearCookie('wish_session', ACCESS_COOKIE_OPTIONS);
  res.cookie(ACCESS_COOKIE_NAME, access, { ...ACCESS_COOKIE_OPTIONS, maxAge: ACCESS_DURATION_SECONDS * 1000 });
  res.cookie(REFRESH_COOKIE_NAME, token, { ...REFRESH_COOKIE_OPTIONS, expires: expiresAt });
};

export const revokeSession = async (req) => {
  const token = getRefreshToken(req);

  if (token) {
    const tokenHash = hashToken(token);

    await Session.deleteOne({ _id: token.split('.')[0], $or: [{ tokenHash }, { usedTokenHashes: tokenHash }] });
  }
};

export const createSession = async (req, res, userId) => {
  const id = new mongoose.Types.ObjectId();
  const token = `${id}.${randomBytes(32).toString('hex')}`;
  const expiresAt = new Date(Date.now() + REFRESH_DURATION_MS);

  await revokeSession(req);
  await Session.create({ _id: id, tokenHash: hashToken(token), userId, expiresAt });
  setSessionCookies(res, userId, token, expiresAt);
};

export const clearSessionCookie = (res) => {
  res.clearCookie(ACCESS_COOKIE_NAME, ACCESS_COOKIE_OPTIONS);
  res.clearCookie(REFRESH_COOKIE_NAME, REFRESH_COOKIE_OPTIONS);
  res.clearCookie('wish_session', ACCESS_COOKIE_OPTIONS);
};

const rejectRefresh = (res) => {
  clearSessionCookie(res);

  throw new HttpError(401, 'Session expired. Please sign in again.');
};

export const refreshSession = async (req, res) => {
  const token = getRefreshToken(req);

  if (!token) return rejectRefresh(res);

  const id = token.split('.')[0];
  const tokenHash = hashToken(token);
  const nextToken = `${id}.${randomBytes(32).toString('hex')}`;
  const now = new Date();
  // A compare-and-swap lets exactly one concurrent request rotate the current token.
  const session = await Session.findOneAndUpdate(
    { _id: id, tokenHash, expiresAt: { $gt: now } },
    { $set: { tokenHash: hashToken(nextToken), rotatedAt: now }, $push: { usedTokenHashes: tokenHash } },
    { returnDocument: 'after' },
  ).lean();

  if (!session) {
    const family = await Session.findById(id).lean();
    const usedHashes = family?.usedTokenHashes ?? [];
    const isConcurrentRefresh =
      family?.expiresAt > now &&
      usedHashes.at(-1) === tokenHash &&
      now.getTime() - family.rotatedAt?.getTime() < REFRESH_ROTATION_GRACE_MS;

    if (isConcurrentRefresh) {
      res.set('Retry-After', '1');
      throw new HttpError(409, 'Session refresh already in progress. Retry shortly.');
    }

    if (usedHashes.includes(tokenHash)) {
      await Session.deleteOne({ _id: id });
    }

    return rejectRefresh(res);
  }

  if (!(await User.exists({ _id: session.userId }))) {
    await Session.deleteOne({ _id: id });

    return rejectRefresh(res);
  }

  setSessionCookies(res, session.userId, nextToken, session.expiresAt);

  return session.userId.toString();
};
