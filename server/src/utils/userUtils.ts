import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SnowflakeId from "./generateSnowflake";

type tokenPayload = string | jwt.JwtPayload;
type usersData = {
    login: string,
    displayedName: string,
    email: string,
    password: string
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passSaltRounds = 6;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRETKEY;
console.log(accessTokenSecret)
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRETKEY;

class userUtils {

    private static _userConfig = {
        nameMinLen: 4,
        nameMaxLen: 25,
        emailRegex,
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
            emailRegex.test(email);
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

    public static generateAccessToken(params:object) {
        return jwt.sign(params, accessTokenSecret!, { expiresIn:"5m" });
    }

    public static generateRefreshToken(params:object) {
        return jwt.sign(params, refreshTokenSecret!);
    }

    public static verifyToken(token:string, secret:string): tokenPayload | undefined {

        let decoded;
        try {
            decoded = jwt.verify(token, secret)
        } catch(e) {
            decoded = undefined;
        }
        return decoded;
    }

    public static async hashPassword(password:string) {
        return bcrypt.hash(password, passSaltRounds);
    }

    public static comparePassword(password:string, hash:string) {
        return bcrypt.compareSync(password, hash)
    }

    public static generateId() {
        return SnowflakeId().generate();
    }
}

export default userUtils;