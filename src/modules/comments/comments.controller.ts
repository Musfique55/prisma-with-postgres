import { Request, Response } from "express";
import { commentServices } from "./comments.services";

const createComment = async (req: Request, res: Response) => {
  try {
    const result = await commentServices.createComment(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const result = await commentServices.getCommentsByPostId(postId as string);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const commentControllers = {
  createComment,
  getCommentsByPostId
};
