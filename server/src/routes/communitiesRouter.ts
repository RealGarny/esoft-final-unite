import { checkAccessAndRefresh, checkAccessToken } from "../middlewares/checkToken";

const communitiesRouter = (router:any, communitiesController:any) => {
    router.get("", checkAccessToken({tokenOptional:true}), communitiesController.getCommunities)
    router.post("", checkAccessAndRefresh(), communitiesController.createCommunity)
    router.patch("", checkAccessAndRefresh(), communitiesController.updateCommunity)

    router.post("/posts", checkAccessToken({tokenOptional:true}), communitiesController.createPost)
    router.get("/posts", checkAccessToken({tokenOptional:true}), communitiesController.getPosts)

    router.post("/follow", checkAccessAndRefresh(), communitiesController.createFollow)

    return router;
}

export default communitiesRouter;