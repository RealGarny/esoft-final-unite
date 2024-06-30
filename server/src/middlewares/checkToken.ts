import { NextFunction, Request, Response } from "express";
import { statusCode } from "../utils/httpStatusCodes";
import TokenService from "../services/tokenService";
import { UserPayload } from "jsonwebtoken";
import TokenData from "../data/tokenData";
import uniteModel from "../models/uniteModel";

declare global {
    namespace Express {
        interface Request {
        user: UserPayload;
        }
    }
}

export const tokenUniteData = new TokenData(uniteModel);
const tokenService = new TokenService(tokenUniteData);

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
        } else {
            req.user = decoded;
            next();
        }
    } catch(e) {
        res.status(statusCode.unauthorized).json({message: "user is not authorized"})
    }
}

export const checkRefreshToken = (req:Request, res:Response, next:NextFunction) => {
    
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const { refreshToken } = req.cookies;

        if(!refreshToken) {
            return res.status(statusCode.unauthorized).json({message: "user is not authorized"})
        }
        
        if(!tokenService.verifyRefreshToken(refreshToken, process.env.REFRESH_TOKEN_SECRETKEY!)) {
            console.log("expired refresh")
            return res.status(statusCode.unauthorized)
                    .json({message: "user is not authorized"})
        }
        next();
    } catch(e) {
        console.log(e)
        res.status(statusCode.unauthorized).json({message: "user is not authorized"})
    }
}

export const checkAccessAndRefresh = [checkAccessToken, checkRefreshToken]