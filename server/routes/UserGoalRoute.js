import { Router } from 'express';
import {createUserGoal, getAllUserGoals, getUserGoalById, updateUserGoal, deleteUserGoal, getUserGoalsByMonth, updateUserGoalStatus} from '../controllers/UserGoalController.js';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { validateRequest } from '../middlewares/validatorMiddleWare.js';
import { goalSchema, updateGoalSchema } from '../schemas/goalSchema.js';

const router = Router();

router.post('/', authMiddleware, validateRequest(goalSchema), createUserGoal);
router.get('/', authMiddleware, getAllUserGoals);
router.get('/:id', authMiddleware, getUserGoalById);
router.put('/:id', authMiddleware, validateRequest(updateGoalSchema), updateUserGoal);
router.delete('/:id', authMiddleware, deleteUserGoal);
router.patch('/:id/status', authMiddleware, updateUserGoalStatus)

export default router;
