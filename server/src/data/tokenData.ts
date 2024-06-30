class TokenData {
    private _db:any;

    public constructor(model:any) {
        this._db = model;
    };
    
    public getRefreshToken = async(token:any) => {
        const user = await this._db("users")
        .select("refreshToken")
        .whereLike("refreshToken", token)
        .first()

        return user.refreshToken
    }

    public RevokeRefreshToken = async(token:any) => {
        const user = await this._db("users")
        .select("refreshToken")
        .whereLike("refreshToken", token)
        .first()

        return user.refreshToken
    }
}

export default TokenData;