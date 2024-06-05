import { Request, Response } from "express";

class communitiesController {
    private _communitiesService;

    public constructor(communitiesService:any) {
        this._communitiesService = communitiesService;
    }

    public getCommunities = (req:Request, res:Response) => {
        this._communitiesService.getCommunities(req.query);
    }
}

export default communitiesController