import { Router } from 'express';
import { getAllUserGoalCategory } from '../controllers/UserGoalCategoryController.js';

const userGoalCategoryRouter = Router();

userGoalCategoryRouter.get('/', getAllUserGoalCategory);

export default userGoalCategoryRouter;
