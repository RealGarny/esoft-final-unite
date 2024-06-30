import cookieParser from "cookie-parser";
import { NextFunction, Request, Response } from "express";

const cookieParse = () => {
    return cookieParser();
}

export default cookieParse;