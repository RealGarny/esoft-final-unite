class TokenData {
    private _db:any;

    public constructor(model:any) {
        this._db = model;
    };
    
    public getRefreshToken = async(token:any) => {
        //dunno how to do it properly, but this will suffice
        const user = await this._db("users")
        .select("*")
        .whereLike("refreshToken", token)
        .first()

        return user
    }

    public RevokeRefreshToken = async(token:any) => {
        return await this._db("users")
        .update("refreshToken", "")
        .whereLike("refreshToken", token)
        .first()
    }
}

export default TokenData;