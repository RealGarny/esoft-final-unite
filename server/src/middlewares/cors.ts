import { NextFunction, Request, Response } from "express";

const cors = (req:Request, res:Response, next:NextFunction) => {
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, HEAD, PUT, PATCH, POST, DELETE");
    }
    next();
}

export default cors;