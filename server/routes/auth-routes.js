import { Router } from 'express';
import { checkAuth } from '../utils/check-auth.js';

import * as AuthController from '../controllers/AuthController.js';
import {
  loginAccountRateLimiter,
  loginIpRateLimiter,
  refreshIpRateLimiter,
  registerRateLimiter,
} from '../middleware/rate-limits.js';
import { loginValidator, registerValidator } from '../validators/auth-validator.js';

const router = Router();

router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');

  return next();
});

// api/auth/register
router.post('/register', registerRateLimiter, registerValidator, AuthController.register);

// api/auth/login
router.post('/login', loginIpRateLimiter, loginAccountRateLimiter, loginValidator, AuthController.login);

router.get('/session', checkAuth, AuthController.getSession);
router.post('/refresh', refreshIpRateLimiter, AuthController.refresh);
router.post('/logout', AuthController.logout);

export default router;
