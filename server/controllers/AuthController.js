import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Something went wrong while login',
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ message: 'Incorrect e-mail or password' });
    }

    const token = jwt.sign({ userId: user.id }, config.get('jwt_secret_key'), { expiresIn: '1h' });
    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Something went wrong while creating user',
      });
    }
    const { name, email, password, preferredCurrency, birthDate, phone } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: 'This e-mail has been already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword, preferredCurrency, birthDate, phone });
    await user.save();

    res.status(201).json({ message: 'User has been created!' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Try again' });
  }
};
