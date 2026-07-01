import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const authorId = req.user?.id;
    const posts = await postService.createPostIntoDb(
      payload,
      authorId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post Created successfully",
      data: posts,
    });
  },
);

const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postService.getAllPostFromDb();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Posts retrieve successfully",
      data: posts,
    });
  },
);

const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params?.postId;
    const post = await postService.getPostById(postId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post Retrieve Successfully",
      data: post,
    });
  },
);

const getPostStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const status = await postService.getPostStatus();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post Status Retrieve Successfully",
      data: status,
    });
  },
);

const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    console.log(authorId);
    const posts = await postService.getMyPosts(authorId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Posts Retrieve Successfully",
      data: posts,
    });
  },
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params?.postId;
    const payload = req.body;
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";

    const result = await postService.updatePostIntoDb(
      payload,
      authorId as string,
      postId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post updated Successfully",
      data: result,
    });
  },
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const isAdmin = req.user?.role === "ADMIN";
    const authorId = req.user?.id;
    const postId = req.params?.postId;

    const result = await postService.deletePostFromDb(
      postId as string,
      authorId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post Deleted Successfully",
      data: result,
    });
  },
);

export const postController = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  getPostStatus,
  getMyPosts,
};
