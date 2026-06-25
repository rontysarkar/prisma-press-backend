import { Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { auth } from "../../middleware/auth";

const router = Router();



router.post("/register", userController.registerUser);
router.get("/me", auth("AUTHOR", "ADMIN", "USER"), userController.getProfile);

export const userRoutes = router;
