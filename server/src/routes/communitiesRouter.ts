import checkUserToken from "../middlewares/checkUserToken";

const communitiesRouter = (router:any, communitiesController:any) => {
    
    router.get("", communitiesController.getCommunities)
    router.post("", checkUserToken, communitiesController.createCommunity)

    return router;
}

export default communitiesRouter;