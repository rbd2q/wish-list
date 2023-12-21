import { Router } from 'express';

import * as AuthController from '../controllers/AuthController.js';
import { loginValidator, registerValidator } from '../validators/auth-validator.js';

const router = Router();

// api/auth/register
router.post('/register', registerValidator, AuthController.register);

// api/auth/login
router.post('/login', loginValidator, AuthController.login);

export default router;
