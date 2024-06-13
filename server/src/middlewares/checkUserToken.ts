import { NextFunction, Request, Response } from "express";
import { statusCode } from "../utils/httpStatusCodes";
import jwt, { JwtPayload } from "jsonwebtoken";
import userUtils from "../utils/userUtils";

declare global {
    namespace Express {
        interface Request {
        user: string | JwtPayload;
        }
    }
}

const checkUserToken = (req:Request, res:Response, next:NextFunction) => {
    
    if(req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization!.split(' ')[1];

        if(!token) {
            return res.status(statusCode.unauthorized).json({message: "user is not authorized"})
        }
        const decoded = userUtils.verifyToken(token, process.env.TOKEN_SECRETKEY!);
        
        if(decoded){
            req.user = decoded;
        }
        next();
    } catch(e) {
        res.status(statusCode.unauthorized).json({message: "user is not authorized"})
    }
}

export default checkUserToken;