import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv = require('dotenv');
dotenv.config();
import SnowflakeId from "./generateSnowflake";

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passSaltRounds = 6;
const secret = process.env.TOKEN_SECRETKEY || "PEROALIS";

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

    public static getUserReqs() {
        return this._userConfig;
    }

    public static generateToken(params:object) {
        return jwt.sign(params, secret, {expiresIn:"48h"});
    }

    public static async hashPassword(password:string) {
        return bcrypt.hash(password, passSaltRounds);
    }

    public static generateUid() {
        return SnowflakeId().generate();
    }
}

export default userUtils;