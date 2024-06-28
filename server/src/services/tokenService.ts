import jwt, {UserPayload} from "jsonwebtoken";
import { tokenPayload } from "../utils/userUtils";

declare module 'jsonwebtoken' {
    export interface UserPayload extends jwt.JwtPayload {
        user:tokenPayload;
    }
}

const tokenService = (tokenData:any = undefined) => {

    const _accessTokenSecret = process.env.ACCESS_TOKEN_SECRETKEY;
    const _refreshTokenSecret = process.env.REFRESH_TOKEN_SECRETKEY;

    const generateAccessToken = (params:object) => {
        return jwt.sign(params, _accessTokenSecret!, { expiresIn:"5m" });
    }

    const generateRefreshToken = (params:object) => {
        return jwt.sign(params, _refreshTokenSecret!);
    }

    const verifyAccessToken = (token:string, secret:string): UserPayload | undefined => {

        let decoded;
        try {
            decoded = <UserPayload>jwt.verify(token, secret)
        } catch(e) {
            decoded = undefined;
        }
        return decoded;
    }

    const verifyRefreshToken = (token:string): true | false => {

        let result;
        try {
            result = tokenData.getRefreshToken(token)

            result = result.length > 0;
        } catch(e) {
            result = false;
        }
        return result;
    }

    return {
        generateAccessToken,
        generateRefreshToken,
        verifyAccessToken,
        verifyRefreshToken
    }
}

export default tokenService;