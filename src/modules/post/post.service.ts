import { prisma } from "../../lib/prisma";
import { IPostPayload, IPostUpdatedPayload } from "./post.interface";

const createPostIntoDb = async (payload: IPostPayload, authorId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId,
    },
  });

  return result;
};

const getAllPostFromDb = async () => {
  const result = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
  return result;
};

const getPostById = async (postId: string) => {
  const result = await prisma.$transaction(
    async (tx) => {
      const updatePost = await tx.post.update({
        data: { views: { increment: 1 } },
        where: { id: postId },
      });
      // throw new Error("Fake error")
      return await tx.post.findUnique({
        where: { id: postId },
      });
    },
    { maxWait: 5000 },
  );
  return result;
};

const getMyPosts = async (authorId: string) => {
  const result = await prisma.post.findMany({
    where: {
      authorId,
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  });

  return result;
};

const updatePostIntoDb = async (
  payload: IPostUpdatedPayload,
  authorId: string,
  postId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });

  if (post.authorId !== authorId && !isAdmin) {
    throw new Error("Only Post Owner or admin update this post");
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      ...payload,
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
  return updatedPost;
};

const deletePostFromDb = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("Post Deleted only owner or admin");
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return null;
};

const getPostStatus = async () => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    // const totalPosts = await tx.post.count();
    // const totalPublishedPosts = await tx.post.count({
    //     where:{
    //         status:"PUBLISHED"
    //     }
    // })

    // const totalArchivePosts = await tx.post.count({
    //     where:{
    //         status:"ARCHIVED"
    //     }
    // });

    // const totalDraftPosts = await tx.post.count({
    //     where:{
    //         status:"DRAFT"
    //     }
    // });

    // const totalViews = await tx.post.aggregate({
    //     _sum:{
    //         views:true
    //     }
    // })

    // return {
    //     totalPosts,
    //     totalPublishedPosts,
    //     totalArchivePosts,
    //     totalDraftPosts,
    //     totalViewsCount : totalViews._sum.views,
    // }

    const [
      totalPosts,
      totalPublishedPosts,
      totalArchivePosts,
      totalDraftPosts,
      totalViews,
    ] = await Promise.all([
      await tx.post.count(),
      await tx.post.count({
        where: {
          status: "PUBLISHED",
        },
      }),

      await tx.post.count({
        where: {
          status: "ARCHIVED",
        },
      }),

      await tx.post.count({
        where: {
          status: "DRAFT",
        },
      }),

      await tx.post.aggregate({
        _sum: {
          views: true,
        },
      }),
    ]);

    return {
      totalPosts,
      totalPublishedPosts,
      totalArchivePosts,
      totalDraftPosts,
      totalViewsCount: totalViews._sum.views,
    };
  });
  return transactionResult;
};

export const postService = {
  createPostIntoDb,
  getAllPostFromDb,
  getPostById,
  getMyPosts,
  updatePostIntoDb,
  deletePostFromDb,
  getPostStatus,
};
