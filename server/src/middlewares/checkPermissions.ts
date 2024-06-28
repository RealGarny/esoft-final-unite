import { Request, Response, NextFunction } from "express"
import { statusCode } from "../utils/httpStatusCodes"

interface userPermissions {
    route:string,
    method:string
}

const checkPermissions = (userPermissions:userPermissions) => {

    return (req:Request, res:Response, next:NextFunction) => {
        if(!req.user.globalRole) {

            res.status(statusCode.unauthorized)
                .json({message: "user is not authorized"})
        }

        next()
    }
}

export default checkPermissions