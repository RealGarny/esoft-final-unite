import { checkAccessAndRefresh } from "../middlewares/checkToken";

const communitiesRouter = (router:any, communitiesController:any) => {
    
    router.get("", communitiesController.getCommunities)
    router.post("", checkAccessAndRefresh, /*checkPermissions({route: "/api/communities", method:"post"}),*/ communitiesController.createCommunity)

    return router;
}

export default communitiesRouter;