import { Comments } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const createComment = async(data : Omit<Comments,"id"|"created_at"|"updated_at"|"status">) => {
  const result = await prisma.comments.create({
    data
  }); 
  return result;
} 

const getCommentsByPostId = async(postId : string) => {
    const result = await prisma.comments.findUnique({
        where : {
            id : postId
        }
    });
    return result;
}


export const commentServices = {
  createComment,
  getCommentsByPostId
}