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

    public createCommunity = async(req:Request, res:Response) => {
        const result = await this._communitiesService.createCommunity(req.user, req.body) //req.user is supposed to be assigned by a middleware
        console.log(result);
        if(!result.error) {
            res.status(statusCode.created).json({message: "community was created"})  
        } else {
            res.status(statusCode.badRequest).json(result)
        }
    }
}

export default CommunitiesController