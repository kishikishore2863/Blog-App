import jwt from 'jsonwebtoken';
import {erorrHandler, errorHandler} from './erorr';
export const verifyToken=(req,res,next)=>{
    const token =req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,'Unauthorized'));
    }
    jwt.verify(token,process.env.JWT_SECERET,(err,user)=>{
        if(err){
           return next(errorHandler(401,'Unauthorized'));
        }
        req.user=user;
        next();
    })
}