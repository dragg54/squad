import * as userController from '../controllers/UserController.js'
import express from 'express'
import { validateRequest } from '../middlewares/validatorMiddleWare.js';
import { userSchema } from '../schemas/userSchema.js';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
const router = express.Router();

router.post('/', validateRequest(userSchema), userController.createUser);
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id',authMiddleware, validateRequest(userSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login',  userController.loginUser)

export default router

