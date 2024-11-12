import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { getAllSquads, createSquad } from '../controllers/SquadController.js';
import { getAllPoints, getUserPoints } from '../controllers/PointController.js';

const router = Router();

router.get('/', authMiddleware, getAllPoints);
router.get('/:id', authMiddleware, getUserPoints);

export default router;
