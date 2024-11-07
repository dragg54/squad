import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { getAllInvite, createInvite } from '../controllers/InviteController.js';

const router = Router();

router.post('/', authMiddleware, createInvite);
router.get('/',  getAllInvite);

export default router;
