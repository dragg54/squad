import { Router } from 'express';
import { getUserAvatars } from '../controllers/UserController.js';

const router = Router();

router.get('/',  getUserAvatars);

export default router;
