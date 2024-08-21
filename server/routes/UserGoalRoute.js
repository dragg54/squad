import { Router } from 'express';
import {createUserGoal, getAllUserGoals, getUserGoalById, updateUserGoal, deleteUserGoal, getUserGoalsByMonth} from '../controllers/UserGoalController.js';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { validateRequest } from '../middlewares/validatorMiddleWare.js';
import { goalSchema } from '../schemas/goalSchema.js';

const router = Router();

router.post('/', authMiddleware, validateRequest(goalSchema), createUserGoal);
router.get('/', authMiddleware, getAllUserGoals);
router.get('/:id', authMiddleware, getUserGoalById);
router.get('/', authMiddleware, getUserGoalsByMonth);
router.put('/:id', authMiddleware, authMiddleware, validateRequest(goalSchema), updateUserGoal);
router.delete('/:id', authMiddleware, deleteUserGoal);

export default router;
