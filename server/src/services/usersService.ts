import { fullUsersData, usersData } from "../utils/userUtils";

type userAuth = {
    login: usersData['login'],
    password: usersData['password']
}

type registerUser = Omit<usersData, "password">

class UsersService {
    private _usersData;
    private _userUtils;
    private _tokenService;

    public constructor(usersData:any, userUtils:any, tokenService:any) {
        this._usersData = usersData;
        this._userUtils = userUtils;
        this._tokenService = tokenService;
    }

    public getUsers() {
        return(this._usersData.getUsers())
    }

    public async getUser(login:string) {
        if(!login || typeof login !== "string" || login.length < 1) {
            return false;
        }

        const fetchedUser = await this._usersData.getUser({login});
        if(!fetchedUser) {
            return false;
        } else {
            return fetchedUser;
        }
    }

    public async authUser(user:userAuth) {
        if(
            !this._userUtils.checkName(user.login) ||
            !this._userUtils.checkPassword(user.password)
        ) return false;

        let fetchedUser:fullUsersData = await this.getUser(user.login);

        if(!fetchedUser || !this._userUtils.comparePassword(user.password, fetchedUser.password)) {
            return false;
        }

        try {
            fetchedUser = this._userUtils.getUserTokenSchema(fetchedUser);

            const accessToken =  this._tokenService.generateAccessToken(fetchedUser);
            const refreshToken = this._tokenService.generateRefreshToken({login: fetchedUser.login});

            try{
            this._usersData.updateUser(fetchedUser.id, {refreshToken})
            } catch(e) {
                console.log(`unable to update users refresh token. user id:${fetchedUser.id}`)
            }


            return {accessToken, refreshToken}
        } catch(e) {
            return false;
        }
    }

    public async createUser(user:usersData) {

        if(!this._userUtils.checkUser(user)) return {error: "USER_INVALID"};

        const userSchema = {
            login: user.login,
            displayedName: user.displayedName,
            email: user.email
        }

        try{
            await this._usersData.createUser({
                ...userSchema,
                password: await this._userUtils.hashPassword(user.password),
                globalRole: 1, //supposed to be user
            });
        }catch(e) {
            return {error: "USER_EXISTS"};
        }

        try{
            const createdUser = await this._usersData.getUser({login: userSchema.login});
            const tokenParams = this._userUtils.getUserTokenSchema(createdUser)

            const refreshToken = this._tokenService.generateRefreshToken({login: tokenParams.login})
            const accessToken =  this._tokenService.generateAccessToken(tokenParams);

            return {accessToken, refreshToken}
        } catch(e) {
            return {error: "USER_NOT_CREATED"}
        }
    }
}

export default UsersService;