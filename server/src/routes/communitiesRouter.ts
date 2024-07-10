import { checkAccessAndRefresh, checkAccessToken } from "../middlewares/checkToken";

const communitiesRouter = (router:any, communitiesController:any) => {
    router.get("", checkAccessToken({tokenOptional:true}), communitiesController.getCommunities)
    router.post("", checkAccessAndRefresh(), communitiesController.createCommunity)
    router.post("/posts", checkAccessAndRefresh(), communitiesController.createPost)
    router.post("/follow", checkAccessAndRefresh(), communitiesController.createFollow)

    return router;
}

export default communitiesRouter;