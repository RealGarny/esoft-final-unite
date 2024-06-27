
const communitiesRouter = (router:any, communitiesController:any) => {
    
    router.get("", communitiesController.getCommunities)
    router.post("", communitiesController.createCommunity)

    return router;
}

export default communitiesRouter;