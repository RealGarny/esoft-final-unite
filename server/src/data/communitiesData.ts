
class CommunitiesData {
    private _db;

    public constructor(model:any) {
        this._db = model;
    }

    public getCommunities(params:any={}, user:any=null) {
        if(params && typeof params !== 'object') throw new Error('Provided parameters are invalid');

        const query = this._db('communities')
            .select("*")
        //TODO: FIX DIS PIECE OF CRAP
        if(user && typeof user === "object") {
            query.select(
                'communities.*',
                this._db.raw('CASE WHEN community_followers."userId" IS NOT NULL THEN TRUE ELSE FALSE END as "isFollowed"')
            )
            query.leftJoin('community_followers', function() {
                //@ts-ignore
                this.on('community_followers.communityId', '=', 'communities.id').andOn('community_followers.userId', '=', user.id);
            })
        }
        if(params.name) {
            query.where('name', params.name)
            .first()
        }
        return query.then((res:any) => {

            if(Array.isArray(res)) {
                for(let i = 0; i < res.length; i++) {
                    delete res[i].userId;
                    delete res[i].communityId;
                }
            }
            
            return res;
        })
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

            this._db('communities')
            .where('id', params.communityId)
            .increment('followCount', 1)
        }

        return query.then((res:any) => {
            console.log(res)
            if(params.deleteFollow && res > 0) {
                this._db('communities')
                .where('id', params.communityId)
                .decrement('followCount', 1)
                .catch((e:any)=>console.log(e))
            } else {
                this._db('communities')
                .where('id', params.communityId)
                .increment('followCount', 1)
                .catch((e:any)=>console.log(e))
            }
            return res
        });
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