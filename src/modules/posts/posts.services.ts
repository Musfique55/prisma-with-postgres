import { Posts } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const createdPost = async(data : Omit<Posts,"id"|"created_at"|"updated_at">) => {
    const result = await prisma.posts.create({
        data
    });
    return result;
}

export const postServices = {
    createdPost
}