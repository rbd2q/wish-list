import { validationResult } from 'express-validator';
import { HttpError } from '../errors/http-error.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { clearSessionCookie, createSession, refreshSession, revokeSession } from '../services/session.js';

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(400, 'Something went wrong while login', errors.array());
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(400, 'User does not exist');
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    throw new HttpError(400, 'Incorrect e-mail or password');
  }

  await createSession(req, res, user.id);
  res.json({ userId: user.id });
};

export const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError(400, 'Something went wrong while creating user', errors.array());
  }
  const { name, email, password, preferredCurrency, birthDate, phone } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new HttpError(400, 'This e-mail has been already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ name, email, password: hashedPassword, preferredCurrency, birthDate, phone });
  await user.save();

  res.status(201).json({ message: 'User has been created!' });
};

export const getSession = (req, res) => {
  res.json({ userId: req.userId });
};

export const logout = async (req, res) => {
  await revokeSession(req);
  clearSessionCookie(res);
  res.sendStatus(204);
};

export const refresh = async (req, res) => {
  const userId = await refreshSession(req, res);

  res.json({ userId });
};
