import { Router } from 'express';
import { check } from 'express-validator';
import * as AuthController from '../controllers/AuthController.js';

const router = Router();

// api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect e-mail').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  ],
  AuthController.register,
);

// api/auth/login
router.post(
  '/login',
  [check('email', 'Enter correct e-mail').normalizeEmail().isEmail(), check('password', 'Enter password').exists()],
  AuthController.login,
);

export default router;
