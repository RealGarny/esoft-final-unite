import { jwtDecode, JwtPayload } from "jwt-decode";

type tokenPayload = string | JwtPayload;
type usersData = {
    login: string,
    displayedName: string,
    email: string,
    password: string
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    public static decodeToken(token:string): tokenPayload | undefined {

        let decoded;
        try {
            decoded = jwtDecode(token)
        } catch(e) {
            decoded = undefined;
        }
        return decoded;
    }
}

export default userUtils;