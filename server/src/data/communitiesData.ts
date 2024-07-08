
class CommunitiesData {
    private _db;

    public constructor(model:any) {
        this._db = model;
    }

    public getCommunities(params:any = {}) {
        if(!params || Object.keys(params).length < 1) {
            return this._db('communities')
            .select("*")
            .limit(5)
        }

        const query = this._db('communities')
            .select("*")

        if(params.name) {
            query.where('name', params.name)
            .first()
        }
        return query.then((res:any) => res)
    }

    public createCommunity(communityParams:any) {
        return this._db('communities')
        .insert(communityParams)
    }

    public createPost(postParams:any) {
        return this._db('posts')
        .insert(postParams)
    }
}

export default CommunitiesData;