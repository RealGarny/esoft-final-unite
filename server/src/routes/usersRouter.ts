import { checkAccessAndRefresh, checkRefreshToken } from "../middlewares/checkToken"

const usersRouter = (router:any, usersController:any) => {

    router.post("/", usersController.createUser)
    router.post("/auth", usersController.authUser)
    router.get("/checkAuth", checkRefreshToken(), usersController.checkAuth)
    router.get("/", usersController.getUsers)
    router.post("update", checkAccessAndRefresh(), usersController.updateUser)

    return router;
}

export default usersRouter;

