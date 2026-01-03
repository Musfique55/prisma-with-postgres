import { Router } from "express";
import { postControllers } from "./posts.controller";
import { auth, Roles } from "../../middleware/auth";

const router = Router();

router.post('/',auth(Roles.USER,Roles.ADMIN),postControllers.createPost);
router.get('/',postControllers.getAllPosts);
router.get('/:id',postControllers.getPostsById);

export const PostRoutes  = router; 