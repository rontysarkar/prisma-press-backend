import { Request, Response } from "express";
import { userService } from "./user.service";
import httpStatus from "http-status";

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUserIntoDb(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success:false,
        statusCode:httpStatus.INTERNAL_SERVER_ERROR,
        message:error.message,
        data:{}
    })
  }
};

export const userController = {
  registerUser,
};
