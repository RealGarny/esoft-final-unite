import jwtDecode from "./jwtDecode";

class TokenUtils {
    private static _localstorageItem = 'accessToken';
    static getLocalStorage():string {
        const token = localStorage.getItem(this._localstorageItem);
        if(!token) return '';

        return token;
    }
    static decodeToken(token:string) {
        try {
            const tokenData = jwtDecode(token)
            return tokenData;
        } catch(e) {
            return '';
        }
    }

    static getTokenData() {
        return this.decodeToken(this.getLocalStorage());
    }
}

export default TokenUtils