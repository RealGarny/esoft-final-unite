import { Request, Response, NextFunction } from "express"
import { statusCode } from "../utils/httpStatusCodes"

interface Options {
    trimUrl: boolean;
}

const checkPermissions = (options:Options = {trimUrl: false}) => {
    return (req:Request, res:Response, next:NextFunction) => {
        let url = req.originalUrl;
        if(options.trimUrl) {
            let trimmed = url.split("/");
            if(trimmed?.length > 1 && trimmed.pop()) {
                url = trimmed.join("/")
            }
        }
        
        if(!req.user.globalRole) {
            res.status(statusCode.unauthorized)
                .json({message: "user is not authorized"})
        }
    
        next()
    }
}

export default checkPermissions