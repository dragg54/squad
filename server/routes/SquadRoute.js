import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { getAllSquads, createSquad } from '../controllers/SquadController.js';

const router = Router();

router.post('/',  createSquad);
router.get('/',  getAllSquads);

export default router;
