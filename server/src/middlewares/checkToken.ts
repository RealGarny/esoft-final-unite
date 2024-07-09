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
        refreshPayload: UserPayload
        }
    }
}

type Options = {
    tokenOptional: boolean
}

export const tokenUniteData = new TokenData(uniteModel);
const tokenService = new TokenService(tokenUniteData);

export const checkAccessToken = (options:Options={tokenOptional:false}) => {
    return(
        (req:Request, res:Response, next:NextFunction) => {
            if(req.method === "OPTIONS") {
                next()
            }
            try {
                const token = req.headers.authorization!.split(' ')[1];
        
                if(!token) {
                    if (options.tokenOptional) next();
                    else return res.status(statusCode.unauthorized).json({message: "user is not authorized"})
                }
                const decoded = tokenService.verifyAccessToken(token);
                if(!decoded){
                    console.log("expired access")
                    return res.status(statusCode.unauthorized).json({message: "user is not authorized"})
                } else {
                    req.user = decoded;
                    next();
                }
            } catch(e) {
                console.log(e)
                res.status(statusCode.unauthorized).json({message: "user is not authorized"})
            }
        }
    )
}

export const checkRefreshToken = (options:Options={tokenOptional:false}) => {

    return(async(req:Request, res:Response, next:NextFunction) => {
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            const { refreshToken } = req.cookies;

            if(!refreshToken) {
                if(options.tokenOptional) next();
                return res.status(statusCode.unauthorized).json({message: "user is not authorized"})
            }

            const refreshPayload = await tokenService.verifyRefreshToken(refreshToken)
            
            if(!refreshPayload) {
                console.log("expired refresh")
                return res.status(statusCode.unauthorized)
                        .json({message: "user is not authorized"})
            }
            req.refreshPayload = refreshPayload;
            next();
        } catch(e) {
            console.log(e)
            res.status(statusCode.unauthorized).json({message: "user is not authorized"})
        }
    })
}

export const checkAccessAndRefresh = (options:Options={tokenOptional:false}) => {
    return [checkAccessToken(options), checkRefreshToken(options)]
}