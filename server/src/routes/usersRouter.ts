import { checkAccessAndRefresh, checkRefreshToken } from "../middlewares/checkToken"
import uploadFile from "../middlewares/uploadFile"
import { uploadUserFiles } from "../utils/fileServer"

const usersRouter = (router:any, usersController:any) => {

    router.post("/", usersController.createUser)
    router.patch("/", checkAccessAndRefresh(),uploadFile(uploadUserFiles()), usersController.updateUser)
    router.post("/auth", usersController.authUser)
    router.get("/checkAuth", checkRefreshToken(), usersController.checkAuth)
    router.get("/", usersController.getUsers)

    return router;
}

export default usersRouter;

