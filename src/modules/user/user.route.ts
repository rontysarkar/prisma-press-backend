import { Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();



router.post("/register", userController.registerUser);
router.get("/me", auth(Role.ADMIN,Role.USER,Role.AUTHOR), userController.getProfile);
router.put('/my-profile',auth(Role.ADMIN,Role.USER),userController.updateProfile);

export const userRoutes = router;
