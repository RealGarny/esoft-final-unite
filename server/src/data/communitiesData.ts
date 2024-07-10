
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

    public createFollow(userId:any, params:any) {
        let query = this._db('community_followers')
        if(params.deleteFollow) {
            query.where(
                {userId,
                communityId: params.communityId
            })
            .del()
        } else {
            query.insert(
                {userId,
                communityId: params.communityId
            })
        }

        return query.then((res:any) => res);
    }

    public getFollows(params:any) {
        const query = this._db('community_followers');
        if(typeof params === "object") {
            query.where(params)
        }
        if(Array.isArray(params)) {
            for(let i = 0; i < params.length; i++) {
                query.where(params[i])
            }
        }
        return query.then((res:any) => res)
    }

    public createPost(postParams:any) {
        return this._db('posts')
        .insert(postParams)
    }
}

export default CommunitiesData;