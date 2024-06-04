import { Router } from "express"

const usersRouter = (routerClass:any, usersController:any) => {
    const router:Router = routerClass();

    router.post("/", usersController.createUser)
    router.get("/:userLogin", usersController.getUser)

    return router;
}

export default usersRouter;

