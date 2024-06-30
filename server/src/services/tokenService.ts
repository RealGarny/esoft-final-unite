import jwt, {UserPayload} from "jsonwebtoken";
import { tokenPayload } from "../utils/userUtils";

declare module 'jsonwebtoken' {
    export interface UserPayload extends jwt.JwtPayload {
        user:tokenPayload;
    }
}

const _accessTokenSecret = process.env.ACCESS_TOKEN_SECRETKEY;
const _refreshTokenSecret = process.env.REFRESH_TOKEN_SECRETKEY;
const _accessExpiration = "50m";
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

    public verifyAccessToken = (token:string, secret:string): UserPayload | undefined => {

        let decoded;
        try {
            decoded = <UserPayload>jwt.verify(token, secret)
        } catch(e) {
            decoded = undefined;
        }
        return decoded;
    }

    public verifyRefreshToken = async(token:string, secret:string): Promise<true | false> => {
        try {
            <UserPayload>jwt.verify(token, secret)
            let result = await this._tokenData.getRefreshToken(token)
            
            if(result) {
                return true;
            }
        } catch(e) {
            console.log(e)
            return false;
        }
        return false;
    }
}

export default TokenService;