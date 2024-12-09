import { Router } from 'express';
import { getAllUserGoalCategory } from '../controllers/UserGoalCategoryController.js';
import { authMiddleware } from '../middlewares/authMiddleWare.js';

const userGoalCategoryRouter = Router();

userGoalCategoryRouter.get('/', authMiddleware, getAllUserGoalCategory);

export default userGoalCategoryRouter;
