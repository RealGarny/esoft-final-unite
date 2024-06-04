import { Router } from "express"

const usersRouter = (routerClass:any, usersController:any) => {
    const router:Router = routerClass();

    router.post("/", usersController.createUser)

    return router;
}

export default usersRouter;

