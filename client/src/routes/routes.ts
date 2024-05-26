interface routes {
    main: string,
    user: string,
    communities: string,
    community: string,
    signIn: string,
    signUp: string
}

const checkString = (string:string) => {
    return !string || typeof string !== "string" || string.length < 1;
}
class Routes {

    private _routes:routes = {
        main: "/",
        user: "/user/:userId",
        communities: "/communities",
        community: "/communities/:communityId",
        signUp: "/sign-up",
        signIn: "/sign-in"
    }    

    public main() {
        return this._routes.main;
    }

    public rawUser() {
        return this._routes.user;
    }

    public user(userTag:string) {
        if(checkString(userTag)) {
            throw Error("userTag is invalid.")
        }

        return this._routes.user.replace(":userId", userTag)
    }

    public communities() {
        return this._routes.communities;
    }

    public rawCommunity() {
        return this._routes.community;
    }

    public community(communityTag:string) {
        if(checkString(communityTag)) {
            throw Error("communityTag is invalid.")
        }

        return this._routes.community.replace(":communityId", communityTag)
    }

    public signIn() {
        return this._routes.signIn
    }

    public signUp() {
        return this._routes.signUp
    }
}

export default new Routes();