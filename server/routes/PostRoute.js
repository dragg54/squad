import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { validateRequest } from '../middlewares/validatorMiddleWare.js';
import { postSchema, updatePostSchema } from '../schemas/postSchema.js';
import { createPost, getAllPosts, updatePost } from '../controllers/PostController.js';

const router = Router();

router.post('/', authMiddleware, validateRequest(postSchema), createPost);
router.get('/', authMiddleware, getAllPosts);
router.put('/:id', authMiddleware, validateRequest(updatePostSchema), updatePost);
export default router;
