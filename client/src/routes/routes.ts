
const checkString = (string:string) => {
    return typeof string !== "string" || string.length < 1;
}
class Routes {

    private _routes = {
        main: "/",
        user: "/user/:userId",
        userCommunities: "/user/:userId/communities",

        communities: "/communities",
        community: "/communities/:communityId",
        communitySettings: `/communities/:communityId/settings`,
        
        signUp: "/sign-up",
        signIn: "/sign-in",
        settings: "/settings"
    }

    public main() {
        return this._routes.main;
    }

    public rawUser() {
        return this._routes.user;
    }

    public rawUserCommunities() {
        return this._routes.userCommunities;
    }

    public userCommunities(userLogin:string) {
        if(checkString(userLogin)) {
            throw Error("userLogin is invalid.")
        }

        return this._routes.userCommunities.replace(":userId", userLogin)
    }

    public user(userLogin:string) {
        if(checkString(userLogin)) {
            throw Error("userLogin is invalid.")
        }

        return this._routes.user.replace(":userId", userLogin)
    }

    public communities() {
        return this._routes.communities;
    }

    public rawCommunity() {
        return this._routes.community;
    }

    public rawCommunitySettings() {
        return this._routes.communitySettings;
    }

    public communitySettings(communityName:string) {
        if(checkString(communityName)) {
            throw Error("community name is invalid.")
        }

        return this._routes.community.replace(":communityId", communityName)
    }

    public community(communityName:string) {
        if(checkString(communityName)) {
            throw Error("community name is invalid.")
        }

        return this._routes.community.replace(":communityId", communityName)
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