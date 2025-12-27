import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { postServices } from "./posts.services";

const createPost = async(req: Request,res:Response) => {
    try {
        const data = req.body;
        const result = await postServices.createdPost(data);
        res.status(201).json(result);
    } catch (error : any) {
        res.status(400).json({
            message : error.message
        })
    }
}

export const postControllers = {
    createPost
}