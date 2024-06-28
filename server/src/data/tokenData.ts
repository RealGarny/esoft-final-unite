class TokenData {
    private _db:any;

    public constructor(model:any) {
        this._db = model;
    };
    
    public getRefreshToken = (token:any) => {
        return this._db("users")
            .get("*")
            .where("refreshToken", "=", token)
    }

}

export default TokenData;