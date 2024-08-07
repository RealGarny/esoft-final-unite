import jwt, {UserPayload} from "jsonwebtoken";
import { tokenPayload } from "../utils/userUtils";

declare module 'jsonwebtoken' {
    export interface UserPayload extends jwt.JwtPayload {
        user:tokenPayload;
    }
}

const _accessTokenSecret = process.env.ACCESS_TOKEN_SECRETKEY;
const _refreshTokenSecret = process.env.REFRESH_TOKEN_SECRETKEY;
const _accessExpiration = 3000000;
const _refreshExpiration = "72h";
class TokenService {
    private _tokenData;
    
    public constructor(tokenData:any) {
        this._tokenData = tokenData
    }

    public generateAccessToken = (params:object) => {
        return jwt.sign(params, _accessTokenSecret!, { expiresIn:_accessExpiration });
    }

    static generateAccessToken = (params:object) => {
        return jwt.sign(params, _accessTokenSecret!, { expiresIn:_accessExpiration });
    }

    public generateRefreshToken = (params:object) => {
        return jwt.sign(params, _refreshTokenSecret!, { expiresIn:_refreshExpiration });
    }

    static generateRefreshToken = (params:object) => {
        return jwt.sign(params, _refreshTokenSecret!, { expiresIn:_refreshExpiration });
    }

    public verifyAccessToken = (token:string): UserPayload | undefined => {

        let decoded;
        try {
            decoded = <UserPayload>jwt.verify(token, _accessTokenSecret!)
        } catch(e) {
            decoded = undefined;
        }
        return decoded;
    }

    public verifyRefreshToken = async(token:string): Promise<UserPayload | false> => {
        try {
            <UserPayload>jwt.verify(token, _refreshTokenSecret!)
            let result = await this._tokenData.getRefreshToken(token)
            if(result) {
                return result;
            }
        } catch(e) {
            return false;
        }
        return false;
    }
}

export default TokenService;