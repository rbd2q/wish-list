import { Router } from 'express';

import * as CollectionController from '../controllers/CollectionController.js';
import { checkAuth } from '../utils/check-auth.js';

const router = Router();

router.use(checkAuth);
router.get('/', CollectionController.getAll);
router.get('/:id', CollectionController.getOne);
router.post('/', CollectionController.create);
router.patch('/:id', CollectionController.update);
router.delete('/:id', CollectionController.remove);

export default router;
