import { check } from 'express-validator';

export const registerValidator = [
  check('email', 'Incorrect e-mail').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

export const loginValidator = [
  check('email', 'Enter correct e-mail').isEmail(),
  check('password', 'Enter password').exists(),
];
