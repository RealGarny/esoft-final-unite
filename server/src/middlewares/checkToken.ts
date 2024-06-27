import { NextFunction, Request, Response } from "express";
import userUtils from "../utils/userUtils";
import { statusCode } from "../utils/httpStatusCodes";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
        user: string | JwtPayload;
        }
    }
}

export const checkAccessToken = (req:Request, res:Response, next:NextFunction) => {
    
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization!.split(' ')[1];

        if(!token) {
            return res.status(statusCode.unauthorized).json({message: "user is not authorized"})
        }
        const decoded = userUtils.verifyToken(token, process.env.ACCESS_TOKEN_SECRETKEY!);
        
        if(decoded){
            req.user = decoded;
        }
        next();
    } catch(e) {
        res.status(statusCode.unauthorized).json({message: "user is not authorized"})
    }
}

export const checkRefreshToken = (req:Request, res:Response, next:NextFunction) => {
    
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.cookies("refreshToken");

        if(!token) {
            return res.status(statusCode.unauthorized).json({message: "user is not authorized"})
        }
        const decoded = userUtils.verifyToken(token, process.env.REFRESH_TOKEN_SECRETKEY!);
        
        if(decoded){
            req.user = decoded;
        }
        next();
    } catch(e) {
        res.status(statusCode.unauthorized).json({message: "user is not authorized"})
    }
}

export const checkAccessAndRefresh = [checkAccessToken, checkRefreshToken];