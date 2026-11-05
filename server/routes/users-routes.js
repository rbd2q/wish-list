import { Router } from 'express';

import * as UserController from '../controllers/UserController.js';
import { checkAuth } from '../utils/check-auth.js';

const router = Router();

// api/users/current
router.get('/current', checkAuth, UserController.getCurrentUser);
router.get('/current/stats', checkAuth, UserController.getCurrentUserStats);

export default router;
