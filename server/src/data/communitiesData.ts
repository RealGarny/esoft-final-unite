
class CommunitiesData {
    private _db;

    public constructor(model:any) {
        this._db = model;
    }

    public createCommunity(communityParams:any) {
        return this._db('communities')
        .insert(communityParams)
    }
}

export default CommunitiesData;