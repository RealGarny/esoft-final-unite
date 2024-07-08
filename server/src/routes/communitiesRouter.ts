import { checkAccessAndRefresh } from "../middlewares/checkToken";
import checkPermissions from "../middlewares/checkPermissions";

const communitiesRouter = (router:any, communitiesController:any) => {
    
    router.get("", communitiesController.getCommunities)
    router.post("", checkAccessAndRefresh, checkPermissions(), communitiesController.createCommunity)
    router.post("/posts", checkAccessAndRefresh, communitiesController.createPost)

    return router;
}

export default communitiesRouter;