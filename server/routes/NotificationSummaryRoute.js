import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { getNotificationSummary } from '../controllers/NotificationController.js';

const router = Router();

router.get('/', authMiddleware,  getNotificationSummary );
export default router;
