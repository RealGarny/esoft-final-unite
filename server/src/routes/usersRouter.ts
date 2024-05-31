import { Router } from "express"

const usersRouter = (routerClass:any, usersController:any) => {
    const router:Router = routerClass();

    router.get("/", usersController.getUsers)

    return router;
}

export default usersRouter;

