import checkPermissions from "../middlewares/checkPermissions"
import { checkAccessAndRefresh, checkRefreshToken } from "../middlewares/checkToken"

const usersRouter = (router:any, usersController:any) => {

    router.post("/", usersController.createUser)
    router.post("/auth", usersController.authUser)
    router.get("/checkAuth", checkRefreshToken, usersController.checkAuth)
    router.get("/:userLogin", checkAccessAndRefresh, checkPermissions({trimUrl:true}), usersController.getUser)

    return router;
}

export default usersRouter;

