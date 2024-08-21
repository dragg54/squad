import * as userController from '../controllers/UserController.js'
import express from 'express'
import { validateRequest } from '../middlewares/validatorMiddleWare.js';
import { userSchema } from '../schemas/userSchema.js';
const router = express.Router();

router.post('/', validateRequest(userSchema), userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validateRequest(userSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login',  userController.loginUser)

export default router

