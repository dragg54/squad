import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleWare.js';
import { validateRequest } from '../middlewares/validatorMiddleWare.js';
import { commentSchema, updateCommentSchema } from '../schemas/commentSchema.js';
import { createComment, deleteCommentLike, getAllComments, getComment, getCommentLikes, likeComment, updateComment } from '../controllers/CommentController.js';

const router = Router();

router.post('/', authMiddleware, validateRequest(commentSchema), createComment);
router.get('/', authMiddleware, getAllComments);
router.get('/:id', authMiddleware, getComment);
router.put('/:id', authMiddleware, validateRequest(updateCommentSchema), updateComment);
router.post("/:id/likes", authMiddleware, likeComment)
router.delete("/:id/likes", authMiddleware, deleteCommentLike)
router.get("/:id/likes", authMiddleware, getCommentLikes)
export default router;
