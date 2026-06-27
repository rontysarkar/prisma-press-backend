import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createPost = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})

const getAllPost = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

const getPostById = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

const getPostStatus = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

const getMyPosts = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

const updatePost = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    console.log("Updated post ???????????????????")
})

const deletePost = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    console.log("Deleted Post >>>>>>>>>>>>>>>>>>>>>>>>>")
})


export const postController = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
    getPostStatus,
    getMyPosts,
}