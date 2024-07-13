

const docsRouter = (router:any, docs:any) => {
    router.use("/0.1.0", docs.serve(), docs.getPage("0.1.0"))

    return router;
}

export default docsRouter;