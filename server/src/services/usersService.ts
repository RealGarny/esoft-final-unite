import { fullUsersData, usersData } from "../utils/userUtils";
import fs from 'fs'
import path = require("path");

type userAuth = {
    login: usersData['login'],
    password: usersData['password']
}

class UsersService {
    private _usersData;
    private _userUtils;
    private _tokenService;

    public constructor(usersData:any, userUtils:any, tokenService:any) {
        this._usersData = usersData;
        this._userUtils = userUtils;
        this._tokenService = tokenService;
    }

     public async getUsers(params:any) {
        const checks = {
            id: (param:any) => this._userUtils.checkNumber(param),
            displayedName: (param:any) => this._userUtils.checkName(param),
            login: (param:any) => this._userUtils.checkName(param),
            limit: (param:any) => this._userUtils.checkNumber(param),
        }
        const filteredParams = this._userUtils.paramChecker(checks, params);
        const result = await this._usersData.getUsers(filteredParams)
        if(!result) return {error: "USERS_NOT_FOUND"}

        return result;
    }

    public async authUser(user:userAuth) {
        if(
            !this._userUtils.checkName(user.login) ||
            !this._userUtils.checkPassword(user.password)
        ) {return false};

        let fetchedUser:fullUsersData = await this._usersData.getUsers({login:user.login, type:"full"});
        console.log(fetchedUser)

        if(!fetchedUser || !this._userUtils.comparePassword(user.password, fetchedUser.password)) {
            return false;
        }
        try {
        const {refreshToken, accessToken} = await this._handleUserTokens(fetchedUser)
        return {refreshToken, accessToken};
        } catch(e) {
            return false;
        }
    }

    public async checkAuth(refreshPayload:fullUsersData) {
        try {
            return this._handleUserTokens(refreshPayload);
        } catch(e) {
            return {error: "TOKENGEN_FAILURE"}
        }
    }

    public async updateUser(data:any, user:any) {
        if(!data || typeof data !== "object" || !user) return {error:"BAD_REQUEST"}
        const files = data.files;
        const params = data.params;

        const checks = {
            displayedName: (param:any) => this._userUtils.checkName(param)
        }

        let filteredParams = this._userUtils.paramChecker(checks, params);

        if(files) {
            const fetchedUser = await this.getUsers({id:user.id})
            if(!fetchedUser) return {message:"USER_NOT_FOUND"}

            if(files.background) {
                if(fetchedUser.bgUrl && fetchedUser.bgUrl.length > 0) {
                    fs.unlink(
                        path.join(__dirname,`../uploads${fetchedUser.bgUrl.split('cdn')[1]}`),
                        (err)=>{console.log(err)}
                    )
                }
                filteredParams['bgUrl'] = `${process.env.SERVER_URL}/cdn/backgrounds/${files.background[0].filename}`
            }
            if(files.icon) {
                if(fetchedUser.iconUrl && fetchedUser.iconUrl.length > 0) {
                    fs.unlink(
                        path.join(__dirname,`../uploads${fetchedUser.iconUrl.split('cdn')[1]}`),
                        (err)=>{console.log(err)}
                    )
                }
                filteredParams['iconUrl'] = `${process.env.SERVER_URL}/cdn/avatars/${files.icon[0].filename}`
            }
        }
        try {
            return await this._usersData.updateUser(filteredParams, user.id)
        } catch(e) {
            console.log(e)
            return {error: "ERROR_INTERNAL"}
        }
    }

    private _updateUserRefresh = (refreshToken:string, userId:any) => {
        return this._usersData.updateUser({refreshToken}, userId)
    }

    public async createUser(user:usersData) {

        if(!this._userUtils.checkUser(user)) return {error: "USER_INVALID"};

        const userSchema = {
            login: user.login,
            displayedName: user.displayedName,
            email: user.email
        }

        const refreshToken = this._createUserRefresh(userSchema)

        try{
            await this._usersData.createUser({
                ...userSchema,
                password: await this._userUtils.hashPassword(user.password),
                globalRole: 1, //supposed to be user
                refreshToken 
            });
        }catch(e) {
            return {error: "USER_EXISTS"};
        }

        try{
            const createdUser = await this._usersData.getUsers({login: userSchema.login, type: "full"});
            const accessToken = this._createUserAccess(createdUser);
            return {accessToken, refreshToken}
        } catch(e) {
            return {error: "USER_NOT_CREATED"}
        }
    }

    private _createUserRefresh(user:usersData) {
        return this._tokenService.generateRefreshToken({login: user.login});
    }

    private _createUserAccess(user:usersData) {
        const tokenParams = this._userUtils.getUserTokenSchema(user)
        return this._tokenService.generateAccessToken(tokenParams);
    }

    private _createUserTokens(user:usersData) {
        const refreshToken = this._createUserRefresh(user);
        const accessToken =  this._createUserAccess(user);

        return { accessToken, refreshToken }
    }

    //generates both access and refresh tokens and updates refresh token in the database
    private async _handleUserTokens(user:fullUsersData) {
        try {
            const { accessToken, refreshToken } = this._createUserTokens(user);
            await this._updateUserRefresh(refreshToken, user.id)

            return {accessToken, refreshToken}
        } catch(e) {
            throw e;
        }
    }
}

export default UsersService;