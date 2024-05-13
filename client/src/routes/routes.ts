interface routes {
    main: string,
    user: string,
    communities: string,
    community: string
}

const routes:routes = {
    main: "/",
    user: "/user/:userTag",
    communities: "/communities",
    community: "/communities/:communityId",
}

export default routes;