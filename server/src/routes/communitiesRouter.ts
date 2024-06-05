import { Router } from "express";

const communitiesRouter = (router:Router, communitiesController:any) => {
    
    router.get("", communitiesController)

    return router;
}