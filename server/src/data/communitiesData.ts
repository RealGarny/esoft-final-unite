
class CommunitiesData {
    private _db;

    public constructor(model:any) {
        this._db = model;
    }

    private getUserSecured(query:any, userTag:string) {
        return query.select(
            `${userTag}.login`,
            `${userTag}.displayedName`,
            `${userTag}.globalRole`,
            //`${userTag}.bgUrl`,
            //`${userTag}.iconUrl`,
            `${userTag}.createdAt as userCreatedAt`,
            `${userTag}.updatedAt as userUpdatedAt`,
        )
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
        if(params.name || params.id) {
            if(params.id) {
                query.where('id', params.id)
            } else {
                query.where('name', params.name)
            }
            query.first()
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

    public updateCommunity(postParams:any, communityId:number) {
        return this._db('communities').where({id:communityId}).update(postParams)
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
        .returning("id")
    }

    public getPosts(postParams:any) {
        const query = this._db('posts')
        this.getUserSecured(query, 'u')
        .join('users as u', 'u.id', 'posts.authorId').as('authorInfo')

        /*{
            id: 1, //post id
            authorId: 1
            authorLogin: "Garny"
            foreignPage:true,
            limit: 5,
            type: short,
            communityName: Yupiie
            communityId: 1
        }
        */
       console.log(postParams.id)
        
        if(postParams.limit) {
            query.limit(postParams.limit)
        }
        if(postParams.id) {
            query.where({'posts.id': postParams.id})
            .first()
        }
        if(postParams.authorLogin || postParams.authorId) {
            if(postParams.authorId) {
                query.where({authorId:postParams.authorId})
            } else {
                query.where({'author.login':postParams.authorLogin})
            }
        }
        if(postParams.communityName || postParams.communityId) {
            if(postParams.communityId) {
                query.where({communityId:postParams.communityId})
            } else {
                query.select('c.name')
                .join('communities as c', 'c.id', 'posts.communityId')
                .where('c.name', postParams.communityName)
            }
        }
        switch(postParams.type) {
            case "full":
                query.select(
                    "c.name as communityName", "c.bgUrl as communityBackground", "c.iconUrl as communityUrl",
                )
                query.join("communities as c", 'posts.communityId', 'c.id')
            case "short":
            default: query.select("posts.*")
        }
        query.orderBy('posts.createdAt', 'desc')
        return query.then((res:any) => {
            return(res)
        })
    }
}

export default CommunitiesData;