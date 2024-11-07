import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { getAllNotifications, createNotification, subscribeNotification, readAllNotifications, getNotificationSummary } from '../controllers/NotificationController.js';

const router = Router();

router.post('/', authMiddleware, createNotification);
router.get('/', authMiddleware,  getAllNotifications);
router.post('/subscribe', subscribeNotification)
// router.patch('/:id/status', updateNotificationStatus)
router.patch('/readAll', authMiddleware, readAllNotifications)
export default router;
