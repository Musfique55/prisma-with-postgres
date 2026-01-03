import { Request, RequestHandler, Response } from "express";
import { postServices } from "./posts.services";
import paginationSortingHelper from "../../utils/paginationSortingHelper";

const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = req.body;
    const result = await postServices.createdPost(data, req.user.id as string);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true" ? true :
       req.query.isFeatured === "false" ? false : undefined
      : undefined;

    const { skip, limit, sortBy, sortOrder, page } = paginationSortingHelper(req.query);
    const result = await postServices.getPosts({
      search: search as string | undefined,
      tags,
    isFeatured,
    skip,
    limit,
    sortBy,
    sortOrder,
    page
    });

    
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getPostsById : RequestHandler = async (req,res) => {
  try {
    const {id} = req.params;
    const result = await postServices.getPostsById(id as string);
    res.status(200).json(result);
  } catch (error : any) {
    console.log(error);
    res.status(400).json({
      error : error.message
    })
  }
}

export const postControllers = {
  createPost,
  getAllPosts,
  getPostsById
};
