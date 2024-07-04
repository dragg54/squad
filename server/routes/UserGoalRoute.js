import { Router } from 'express';
import {createUserGoal, getAllUserGoals, getUserGoalById, updateUserGoal, deleteUserGoal} from '../controllers/UserGoalController.js';
import { authMiddleware } from '../middlewares/authMiddleWare.js';

const router = Router();

router.post('/userGoals', authMiddleware, createUserGoal);
router.get('/userGoals', authMiddleware, getAllUserGoals);
router.get('/userGoals/:id', authMiddleware, getUserGoalById);
router.put('/userGoals/:id', authMiddleware, updateUserGoal);
router.delete('/userGoals/:id', authMiddleware, deleteUserGoal);

export default router;
