import bcrypt from "bcrypt";
import SnowflakeId from "./generateSnowflake";
import ServiceUtil from "./serviceUtil";

export type usersData = {
    login: string,
    displayedName: string,
    email: string,
    password?: string
}

export type fullUsersData = usersData & {
    id: number,
    globalRole: number,
    createdAt: Date,
    updatedAt: Date,
    lastSeen: Date,
    refreshToken: null | string
}

export type tokenPayload = Omit<fullUsersData, "password" | "refreshToken" | "lastSeen">

class userUtils extends ServiceUtil {

    private static passSaltRounds = 6;

    private static _userConfig = {
        nameMinLen: 4,
        nameMaxLen: 25,
        emailRegex: this._emailRegex,
        emailMaxLen: 254,
        passwordMinLen: 8,
        passwordMaxLen: 25
    }
    
    public static checkName(name:string) {
        const string = this.checkString(name)
        if(string &&
            name.length >= this._userConfig.nameMinLen &&
            name.length <= this._userConfig.nameMaxLen){
            return string;
        };
        return null;
    }

    public static checkPassword(password:string) {
        return this.checkString(password) &&
            password.length >= this._userConfig.passwordMinLen &&
            password.length <= this._userConfig.passwordMaxLen;
    }

    public static checkEmail(email:string) {
        return this.checkString(email) &&
            email.length < this._userConfig.emailMaxLen &&
            this._emailRegex.test(email);
    }

    public static checkAuthUser(user:any) {
        return(this.checkName(user.login) && this.checkPassword(user.password))
    }

    public static checkUser(user:usersData) {
        return (this.checkName(user.displayedName) &&
            this.checkName(user.login) &&
            this.checkEmail(user.email) && 
            this.checkPassword(user.password!)
        )
    }

    public static getUserTokenSchema(user:fullUsersData):tokenPayload {
        return {
            id: user.id,
            login: user.login,
            displayedName: user.displayedName,
            email: user.email,
            globalRole: user.globalRole,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }

    public static getUserReqs() {
        return this._userConfig;
    }

    public static async hashPassword(password:string) {
        return bcrypt.hash(password, this.passSaltRounds);
    }

    public static comparePassword(password:string, hash:string) {
        return bcrypt.compareSync(password, hash)
    }

    public static generateId() {
        return SnowflakeId().generate();
    }
}

export default userUtils;