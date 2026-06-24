import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



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

export const userController = {
  registerUser,
};
