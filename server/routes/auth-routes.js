import { Router } from 'express';

import * as AuthController from '../controllers/AuthController.js';
import { loginAccountRateLimiter, loginIpRateLimiter, registerRateLimiter } from '../middleware/rate-limits.js';
import { loginValidator, registerValidator } from '../validators/auth-validator.js';

const router = Router();

// api/auth/register
router.post('/register', registerRateLimiter, registerValidator, AuthController.register);

// api/auth/login
router.post('/login', loginIpRateLimiter, loginAccountRateLimiter, loginValidator, AuthController.login);

export default router;
