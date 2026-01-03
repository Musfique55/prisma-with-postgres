import { Router } from "express";
import { commentControllers } from "./comments.controller";

const router = Router();

router.post('/', commentControllers.createComment);
router.get('/:postId', commentControllers.getCommentsByPostId);

export const CommentRoutes = router;