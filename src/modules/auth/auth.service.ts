import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";


const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
     throw new Error("Password Incorrect");
  }

  const jwtPayload = {
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role,
    
  }

  const accessToken = jwtUtils.createToken(jwtPayload,config.jwt_access_secret,config.jwt_access_expires_in as SignOptions);
  const refreshToken = jwtUtils.createToken(jwtPayload,config.jwt_refresh_secret,config.jwt_refresh_expires_in as SignOptions)

  return {
    accessToken,
    refreshToken
  };
};

const refreshToken = async(token:string)=>{
    
  const verifiedToken = jwtUtils.verifyToken(token,config.jwt_refresh_secret);

  if(!verifiedToken.success){
    throw new Error(verifiedToken.data);
  }
  const {id} = verifiedToken.data;

  const user = await prisma.user.findUniqueOrThrow({
    where:{id}
  })
  
  if(user.activeStatus === 'BLOCK'){
    throw new Error("User is blocked");
  }

  const jwtPayload = {
    name:user.name,
    email:user.email,
    id:user.id,
    role:user.role
  }

  const accessToken = jwtUtils.createToken(jwtPayload,config.jwt_access_secret, config.jwt_access_expires_in as SignOptions);
  return {accessToken};
}

export const authService = {
  loginUser,
  refreshToken,
};
