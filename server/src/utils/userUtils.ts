import bcrypt from "bcrypt";
import SnowflakeId from "./generateSnowflake";

export type usersData = {
    login: string,
    displayedName: string,
    email: string,
    password: string
}

export type fullUsersData = usersData & {
    id: number,
    globalRole: number,
    createdAt: Date,
    updatedAT: Date,
    lastSeen: Date,
    refreshToken: null | string
}

export type tokenPayload = Omit<fullUsersData, "password" | "refresh">
class userUtils {

    private static emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private static passSaltRounds = 6;

    private static _userConfig = {
        nameMinLen: 4,
        nameMaxLen: 25,
        emailRegex: this.emailRegex,
        emailMaxLen: 254,
        passwordMinLen: 8,
        passwordMaxLen: 25
    }

    private static _checkString(string:string) {
        return !!string && typeof string === "string";
    }
    
    public static checkName(name:string) {
        return this._checkString(name) &&
            name.length >= this._userConfig.nameMinLen &&
            name.length <= this._userConfig.nameMaxLen;
    }

    public static checkPassword(password:string) {
        return this._checkString(password) &&
            password.length >= this._userConfig.passwordMinLen &&
            password.length <= this._userConfig.passwordMaxLen;
    }

    public static checkEmail(email:string):boolean {
        return this._checkString(email) &&
            email.length < this._userConfig.emailMaxLen &&
            this.emailRegex.test(email);
    }

    public static checkUser(user:usersData):boolean {
        if(
            !this.checkName(user.displayedName) ||
            !this.checkName(user.login) ||
            !this.checkEmail(user.email) || 
            !this.checkPassword(user.password)
        ) return false;
        else return true;
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