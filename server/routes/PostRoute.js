import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { validateRequest } from '../middlewares/validatorMiddleWare.js';
import { postSchema, updatePostSchema } from '../schemas/postSchema.js';
import { createPost, deletePostLike, getAllPosts, getPost, getPostLikes, likePost, updatePost } from '../controllers/PostController.js';

const router = Router();

router.post('/', authMiddleware, validateRequest(postSchema), createPost);
router.get('/', authMiddleware, getAllPosts);
router.get('/:id', authMiddleware, getPost);
router.put('/:id', authMiddleware, validateRequest(updatePostSchema), updatePost);
router.post("/:id/likes", authMiddleware, likePost)
router.delete("/:id/likes", authMiddleware, deletePostLike)
router.get("/:id/likes", authMiddleware, getPostLikes)
export default router;
