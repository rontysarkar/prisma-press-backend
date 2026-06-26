import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";



const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.createUserIntoDb(req.body);

  sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    message:"User created successfully",
    data:{
      user
    }
  })


});

const getProfile = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

  
  const user =await userService.getProfileFromDb(req.user?.id as string);

  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Profile get successfully",
    data:user
  })
  
})

const updateProfile = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

  const user = await userService.updatedProfileIntoDb(req.body,req.user?.id as string);
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Updated Profile successfully",
    data:user
  })
})

export const userController = {
  registerUser,
  getProfile,
  updateProfile,
};
