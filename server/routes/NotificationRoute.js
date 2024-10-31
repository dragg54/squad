import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { getAllNotifications, createNotification, subscribeNotification } from '../controllers/NotificationController.js';

const router = Router();

router.post('/',  createNotification);
router.get('/',  getAllNotifications);
router.post('/subscribe', subscribeNotification)

export default router;
