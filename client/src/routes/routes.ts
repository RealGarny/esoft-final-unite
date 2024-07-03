
const checkString = (string:string) => {
    return !string || typeof string !== "string" || string.length < 1;
}
class Routes {

    private _routes = {
        main: "/",
        user: "/user/:userId",
        communities: "/communities",
        
        signUp: "/sign-up",
        signIn: "/sign-in",
        settings: "/settings"
    }
    private _rawRoutes = {
        community: "/communities/:communityId",
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
        return this._rawRoutes.community;
    }

    public community(communityName:string) {
        if(checkString(communityName)) {
            throw Error("community name is invalid.")
        }

        return this._rawRoutes.community.replace(":communityId", communityName)
    }

    public signIn() {
        return this._routes.signIn;
    }

    public signUp() {
        return this._routes.signUp;
    }
    public settings() {
        return this._routes.settings;
    }
}

export default new Routes();