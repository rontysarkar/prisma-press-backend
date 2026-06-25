import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"


const createToken = (jwtPayload:JwtPayload,secret:string,expiresIn:SignOptions) =>{
   return jwt.sign(jwtPayload,secret,{expiresIn:expiresIn} as SignOptions);
}

const verifyToken = (token:string,secret:string)=>{
    return jwt.verify(token,secret)
}


export const jwtUtils = {
    createToken,
    verifyToken
}