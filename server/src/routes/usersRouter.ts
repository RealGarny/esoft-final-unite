
const usersRouter = (router:any, usersController:any) => {

    router.post("/", usersController.createUser)
    router.post("/auth", usersController.authUser)
    router.get("/:userLogin", usersController.getUser)

    return router;
}

export default usersRouter;

