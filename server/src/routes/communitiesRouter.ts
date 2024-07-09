import { checkAccessAndRefresh } from "../middlewares/checkToken";
import checkPermissions from "../middlewares/checkPermissions";

const communitiesRouter = (router:any, communitiesController:any) => {
    router.get("", checkAccessAndRefresh({tokenOptional:true}), communitiesController.getCommunities)
    router.post("", checkAccessAndRefresh(), communitiesController.createCommunity)
    router.post("/posts", checkAccessAndRefresh(), communitiesController.createPost)
    router.post("/follow", checkAccessAndRefresh(), communitiesController.createFollow)

    return router;
}

export default communitiesRouter;