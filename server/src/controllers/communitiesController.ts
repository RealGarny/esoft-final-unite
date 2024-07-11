import { Request, Response } from "express";
import {statusCode}from "../utils/httpStatusCodes";

class CommunitiesController {
    private _communitiesService;

    public constructor(communitiesService:any) {
        this._communitiesService = communitiesService;
    }

    public getCommunities = async(req:Request, res:Response) => {

        const result = await this._communitiesService.getCommunities(req.query, req.user);
        if(!result.error) {
            res.status(statusCode.created).json(result)  
        } else {
            res.status(statusCode.badRequest).json(result)
        }
        
    }

    public updateCommunity = async(req:Request, res:Response) => {

        const result = await this._communitiesService.updateCommunity(req.body, req.user);
        if(!result.error) {
            res.status(statusCode.created).json(result)  
        } else {
            res.status(statusCode.badRequest).json(result)
        }
        
    }

    public createPost = async(req:Request, res:Response) => {

        const result = await this._communitiesService.createPost(req.user, req.body);
        if(!result.error) {
            res.status(statusCode.created).json(result)  
        } else {
            res.status(statusCode.badRequest).json(result)
        }
        
    }

    public getPosts = async(req:Request, res:Response) => {
        const result = await this._communitiesService.getPosts(req.query, req.user);
        if(!result.error) {
            res.status(statusCode.created).json(result)
        } else {
            res.status(statusCode.badRequest).json(result)
        }
    }

    public createFollow = async(req:Request, res:Response) => {

        const result = await this._communitiesService.createFollow(req.user, req.body);
        if(!result.error) {
            res.status(statusCode.created).json(result)  
        } else {
            res.status(statusCode.internal).json({message: result.error})
        }
        
    }

    public createCommunity = async(req:Request, res:Response) => {
        const result = await this._communitiesService.createCommunity(req.user, req.body) //req.user is supposed to be assigned by a middleware
        if(!result.error) {
            res.status(statusCode.created).json({message: "community was created"})  
        } else {
            res.status(statusCode.badRequest).json(result)
        }
    }
}

export default CommunitiesController