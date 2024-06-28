import { NextFunction, Request, Response } from "express";
import { statusCode } from "../utils/httpStatusCodes";
import TokenService from "../services/tokenService";
import { UserPayload } from "jsonwebtoken";
import { tokenUniteData } from "../routes";

declare global {
    namespace Express {
        interface Request {
        user: UserPayload;
        }
    }
}

const tokenService = TokenService(tokenUniteData);

export const checkAccessToken = (req:Request, res:Response, next:NextFunction) => {
    
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization!.split(' ')[1];

        if(!token) {
            return res.status(statusCode.unauthorized).json({message: "user is not authorized"})
        }
        const decoded = tokenService.verifyAccessToken(token, process.env.ACCESS_TOKEN_SECRETKEY!);
        if(!decoded){
            console.log("expired access")
            return res.status(statusCode.unauthorized).json({message: "user is not authorized"})
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
        
        if(!tokenService.verifyRefreshToken(token)){
            console.log("expired refresh")
            res.status(statusCode.unauthorized)
                .json({message: "user is not authorized"})
        }
        next();
    } catch(e) {
        res.status(statusCode.unauthorized).json({message: "user is not authorized"})
    }
}

export const checkAccessAndRefresh = [checkAccessToken, checkRefreshToken]