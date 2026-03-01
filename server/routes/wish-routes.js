import { Router } from 'express';
import * as WishController from '../controllers/WishController.js';
import { checkAuth } from '../utils/check-auth.js';

const router = Router();

// api/wish
router.get('/', checkAuth, WishController.getAllMyWishes);

// api/wish/ideas
router.get('/ideas', checkAuth, WishController.getFullWishesList);

// api/wish/:id
router.get('/:id', WishController.getWishListItem);

// api/wish/create
router.post('/create', checkAuth, WishController.create);

// api/wish/parse
router.post('/parse', WishController.parse);

// api/wish/:id
router.delete('/:id', WishController.deleteItem);

// api/wish/:id
router.patch('/:id', WishController.update);

export default router;
