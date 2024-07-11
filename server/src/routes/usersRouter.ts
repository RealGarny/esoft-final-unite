import { checkAccessAndRefresh, checkRefreshToken } from "../middlewares/checkToken"

const usersRouter = (router:any, usersController:any) => {

    router.post("/", usersController.createUser)
    router.patch("/", checkAccessAndRefresh(), usersController.updateUser)
    router.post("/auth", usersController.authUser)
    router.get("/checkAuth", checkRefreshToken(), usersController.checkAuth)
    router.get("/", usersController.getUsers)

    return router;
}

export default usersRouter;

