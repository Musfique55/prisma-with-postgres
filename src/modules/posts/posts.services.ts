import { Posts } from "../../../generated/prisma/client";
import { PostsWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createdPost = async (
  data: Omit<Posts, "id" | "created_at" | "updated_at" | "authorId">,
  userId: string
) => {
  const result = await prisma.posts.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  return result;
};

const getPosts = async ({
  search,
  tags,
  isFeatured,
  skip,
  limit,
  sortBy,
  sortOrder,
  page
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured : boolean | undefined;
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page : number
}) => {
  const additionalFilter : PostsWhereInput[]  = [];

  if (search) {
    additionalFilter.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search,
          },
        },
      ],
    });
  }

  if (tags.length > 0) {
    additionalFilter.push({
      tags: {
        hasEvery: tags as string[],
      },
    });
  }

  if(typeof isFeatured === "boolean"){
    additionalFilter.push({
        isFeatured
    })
  }
  

  const result = await prisma.posts.findMany({
    take : limit,
    skip,
    orderBy : {
      [sortBy] : sortOrder
    },
    where: {
      AND: additionalFilter,
    },
  });

  const total = await prisma.posts.count({
    where : {
      AND : additionalFilter
    }
  });

  return {
    data : result,
    pagination : {
      total,
      page,
      limit,
      totalPage : Math.ceil(total / limit)
    }
  }
};

const getPostsById = async(postId : string) => {
  return await prisma.$transaction(async(tx) => {
    await tx.posts.update({
      where : {
        id : postId
      },
      data : {
        views : {
          increment : 1
        }
      }
    })

    const post = await tx.posts.findUnique({
      where : {
        id : postId
      }
    })
    return post;
  })
}

export const postServices = {
  createdPost,
  getPosts,
  getPostsById
};
