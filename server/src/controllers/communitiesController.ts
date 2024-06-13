import { Request, Response } from "express";
import {statusCode}from "../utils/httpStatusCodes";

class CommunitiesController {
    private _communitiesService;

    public constructor(communitiesService:any) {
        this._communitiesService = communitiesService;
    }

    public getCommunities = (req:Request, res:Response) => {
        this._communitiesService.getCommunities(req.query);
    }

    public createCommunity = (req:Request, res:Response) => {
        const result = this._communitiesService.createCommunity(req.user, req.body) //req,user is supposed to be assigned by a middleware
        if(result) {
            res.status(statusCode.created).json({message: "community was created"})  
        } else {
            res.status(statusCode.badRequest).json({message: "unable to create community"})
        }
    }
}

export default CommunitiesController