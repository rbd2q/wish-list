import config from 'config';
import jwt from 'jsonwebtoken';

import { ACCESS_COOKIE_NAME, ACCESS_TOKEN_AUDIENCE, ACCESS_TOKEN_ISSUER } from '../config/session.js';
import { HttpError } from '../errors/http-error.js';

export const checkAuth = (req, res, next) => {
  const token = req.cookies[ACCESS_COOKIE_NAME];

  if (!token) throw new HttpError(401, 'Нет доступа');

  try {
    const payload = jwt.verify(token, config.get('jwt_secret_key'), {
      algorithms: ['HS256'],
      issuer: ACCESS_TOKEN_ISSUER,
      audience: ACCESS_TOKEN_AUDIENCE,
    });

    if (typeof payload.userId !== 'string' || !/^[a-f0-9]{24}$/i.test(payload.userId)) {
      throw new Error('Invalid access token identity');
    }

    req.userId = payload.userId.toLowerCase();
  } catch {
    // Do not clear cookies here: another tab may already have refreshed them.
    throw new HttpError(401, 'Нет доступа');
  }

  return next();
};

export const optionalAuth = (req, res, next) => {
  const token = req.cookies[ACCESS_COOKIE_NAME];

  if (token) return checkAuth(req, res, next);

  return next();
};
