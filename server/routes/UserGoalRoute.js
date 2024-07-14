import { Router } from 'express';
import {createUserGoal, getAllUserGoals, getUserGoalById, updateUserGoal, deleteUserGoal} from '../controllers/UserGoalController.js';
import { authMiddleware } from '../middlewares/authMiddleWare.js';

const router = Router();

router.post('/', authMiddleware, createUserGoal);
router.get('/', authMiddleware, getAllUserGoals);
router.get('/:id', authMiddleware, getUserGoalById);
router.put('/:id', authMiddleware, updateUserGoal);
router.delete('/:id', authMiddleware, deleteUserGoal);

export default router;
