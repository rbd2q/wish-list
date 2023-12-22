import { Router } from 'express';

import * as AnalyticsController from '../controllers/AnalyticsController.js';
import { checkAuth } from '../utils/check-auth.js';

const router = Router();

// api/analytics
router.get('/', checkAuth, AnalyticsController.getCurrentUserAnalytics);

export default router;
