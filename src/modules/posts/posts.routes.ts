import { Router } from "express";
import { postControllers } from "./posts.controller";

const router = Router();

router.post('/',postControllers.createPost);

export const PostRoutes  = router; 