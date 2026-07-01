import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'

const createComment = catchAsync(async(req:Request,res:Response)=>{

    const result = await commentService.createComment(req.user?.id as string,req.body);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"comment created successfully",
        data:result
    })
    
})


const getCommentById = catchAsync(async(req:Request,res:Response)=>{

    const result = await commentService.getCommentById(req.params?.commentId as string);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"comment retrieve successfully",
        data:result
    })
    
})

const getCommentByAuthorId = catchAsync(async(req:Request,res:Response)=>{

    const result = await commentService.getCommentByAuthorId(req.params?.authorId as string);

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"comments retrieve successfully",
        data:result
    })
    
})




const updateComment = catchAsync(async(req:Request,res:Response)=>{

    const result = await commentService.updateCommentById(req.user?.id as string,req.user?.role === 'ADMIN',req.params?.commentId as string,req.body);
    
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"comment updated successfully",
        data:result
    })
    
})


const deleteComment = catchAsync(async(req:Request,res:Response)=>{

    const result = await commentService.deletedComment(req.user?.id as string,req.user?.role === 'ADMIN',req.params?.commentId as string);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"comment deleted successfully",
        data:result
    })
    
})


export const commentController = {
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
    getCommentByAuthorId
}

