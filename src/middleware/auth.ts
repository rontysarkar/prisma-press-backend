import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import httpStatus from 'http-status'


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
    }
  }
}

export const auth = (...requiredRole: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.accessToken
        ? req.cookies.accessToken
        : req.headers.authorization?.startsWith("Bearer ")
          ? req.headers.authorization.split(" ")[1]
          : req.headers.authorization;

      if (!token) {
        throw new Error(
          "You are not login in , please login and access resource",
        );
      }

      const verifiedToken = jwtUtils.verifyToken(
        token,
        config.jwt_access_secret,
      );

      const { email, role, id, name } = verifiedToken as JwtPayload;


      if (requiredRole.length && !requiredRole.includes(role)) {
        throw new Error(
          "Forbidden. You don't have permission to access this resource.",
        );
      }

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email,
          name,
          id,
          role,
        },
      });

      if (user.activeStatus === "BLOCK") {
        throw new Error("User is block please contract support");
      }
      req.user = {
        name: user.name,
        id: user.id,
        email: user.email,
        role: user.role,
      };
      next();
    } catch (error: any) {
      console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: {},
      });
    }
  };
};
