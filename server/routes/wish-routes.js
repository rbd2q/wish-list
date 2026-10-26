import express, { Router } from 'express';

import * as WishController from '../controllers/WishController.js';
import { imageDownloadRateLimiter, imageRateLimiters, parseRateLimiters } from '../middleware/rate-limits.js';
import { checkAuth, optionalAuth } from '../utils/check-auth.js';

const router = Router();

// api/wish
router.get('/', checkAuth, WishController.getAllMyWishes);

// api/wish/ideas
router.get('/ideas', checkAuth, WishController.getFullWishesList);

router.post(
  '/image',
  checkAuth,
  imageRateLimiters,
  express.raw({ type: 'image/*', limit: '10mb' }),
  WishController.uploadImage,
);

// api/wish/:id
router.get('/:id', optionalAuth, WishController.getWishListItem);

// api/wish/create
router.post('/create', checkAuth, imageDownloadRateLimiter, WishController.create);

// api/wish/:id/copy
router.post('/:id/copy', checkAuth, WishController.copy);

// api/wish/parse
router.post('/parse', checkAuth, parseRateLimiters, WishController.parse);

// api/wish/:id
router.delete('/:id', checkAuth, WishController.deleteItem);

router.patch('/:id/collections', checkAuth, WishController.updateCollections);

// api/wish/:id
router.patch('/:id', checkAuth, imageDownloadRateLimiter, WishController.update);

export default router;
