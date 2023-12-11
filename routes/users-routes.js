import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import * as UserController from '../controllers/UserController.js';

const router = Router();

// api/users/current
router.get('/current', checkAuth, UserController.getCurrentUser);

export default router;
