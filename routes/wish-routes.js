import { Router } from 'express';
import * as WishController from '../controllers/WishController.js';
import { checkAuth } from '../utils/check-auth.js';

const router = Router();

// api/wish
router.get('/', checkAuth, WishController.getAllMyWishes);

// api/wish/create
router.post('/create', checkAuth, WishController.create);

export default router;
