
import { Router } from 'express';
import { getUserGoalsByMonth } from '../controllers/UserGoalController.js';
import { authMiddleware } from '../middlewares/authMiddleWare.js';


export const router = Router();

router.get('/', authMiddleware, getUserGoalsByMonth);
