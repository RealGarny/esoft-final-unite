type CreateCommunity = {
    name: string,
    description: string,
    creator: number,
    followerNickname: string,
    bgUrl: string,
    iconUrl: string,
}

type CreatePost = {
    content:string,
    communityId:string
}

class CommunitiesService {
    private _communitiesData;
    private _communitiesUtils;

    public constructor(communitiesData:any, communitiesUtils:any) {
        this._communitiesData = communitiesData;
        this._communitiesUtils = communitiesUtils;
    }

    public getPosts = async(params:any={}, user:any=null) => {
        if(typeof params !== "object") return {message:"BAD_REQUEST"}
        if(Object.keys(params).length > 20) return {message:"TOO_MANY_PARAMETERS"} //pass to a middleware

        const filteredParams:any = {}

        //accepted params
        const checks = {
            foreignPage: (param:any) => {
                if(typeof param === 'string') {
                    return this._communitiesUtils.parseBoolean(param);
                }
            },
            limit: (param:any) => this._communitiesUtils.checkNumber(param),
            id: (param:any) => this._communitiesUtils.checkNumber(param),
            authorId: (param:any) => this._communitiesUtils.checkNumber(param),
            authorLogin: (param:any) => this._communitiesUtils.checkString(param),
            type: (param:any) => this._communitiesUtils.checkString(param),
            communityName: (param:any) => this._communitiesUtils.checkString(param),
            communityId: (param:any) => this._communitiesUtils.checkNumber(param)
        }

        for(let [key, value] of Object.entries(params)) {
            //checks if such key exists in the checks object and passes its conditions
            if(key in checks && checks[key as  keyof typeof checks](value)) {
                filteredParams[key] = checks[key as  keyof typeof checks](value);
            }
        }
        try {
            const result = await this._communitiesData.getPosts(filteredParams, user)
            if(!result) return {error: "POSTS_NOT_FOUND"}
            return result;
        } catch(e) {
            console.log(e);
            return {error: "BAD_REQUEST"}
        }
    }

    public createPost = async(user:any, post:CreatePost) => {

        if(!user || !post.content || !post.communityId) return null;

        const authorId = this._communitiesUtils.checkId(user.id);
        const content = this._communitiesUtils.checkPostContent(post.content);
        const communityId = this._communitiesUtils.checkId(post.communityId);

        if(
            !authorId || !content || !communityId) {
            return {error: "BAD_POST"}
        }

        
        try{
            const postId = await this._communitiesData.createPost({authorId, content, communityId})
            if(typeof postId[0].id !== 'number') return "INTERNAL ERROR";

            return await this.getPosts({id:postId[0].id});
        } catch(e:any) {
            if(e.detail) {
                return {error: "BAD_POST"}
            } else {
                return {error: "INTERNAL_ERROR"}
            }
        }
    }

    public updateCommunity = async(communityParams:any, user:any) => {
        if(typeof communityParams !== "object") return {error: "BAD_REQUEST"}
        console.log(user)
        const checks = {
            followerNickname: (param:any) => this._communitiesUtils.checkFollowerNickname(param),
        }
        try {
            const fetchedCommunity = await this.getCommunities({id:communityParams.communityId})
            if(fetchedCommunity.creator !== user.id) return {error:"NOT_PERMITTED"}
        } catch(e) {
            return {error: "COMMUNITY_NOT_EXIST"}
        }

        let filteredParams:any = {}

        for(let [key, value] of Object.entries(communityParams)) {
            //checks if such key exists in the checks object and passes its conditions
            if(key in checks && checks[key as  keyof typeof checks](value)) {
                filteredParams[key] = checks[key as  keyof typeof checks](value);
            }
        }

        try {
            const res = await this._communitiesData.updateCommunity({...filteredParams}, communityParams.communityId);
            console.log(res)
            return res
        } catch(e) {
            console.log(e)
            return {error: "INTERNAL_ERROR"}
        }
    }

    public getCommunities = async(params:any, user:any=null) => {
        //TODO: CHECK PARAMS
        const filteredParams = params
        try {
            const result = await this._communitiesData.getCommunities(filteredParams, user)
            if(!result) return {error: "COMMUNITIES_NOT_FOUND"}
            return result;
        } catch(e) {
            console.log(e);
            return {error: "BAD_REQUEST"}
        }
    }

    public getFollows = async(params:any) => {
        let finalParams:any = {}
        if(typeof params !== "object") return {message:"BAD_REQUEST"};
        
        if(typeof params === "object") {
            for(const [key, value] of Object.entries(params)) {
                switch(typeof value) {
                    case "string":
                        if(this._communitiesUtils.checkName(value)) finalParams[key] = value
                    case "number":
                        if(this._communitiesUtils.checkId(value)) finalParams[key] = value
                }
            }
        }
        
        try {
            return await this._communitiesData.getFollows(finalParams);
        } catch(e) {
            return {message:"NOT_FOUND"}
        }
    }

    public createFollow = async(user:any, params:any) => {
        const communityId = this._communitiesUtils.checkId(params.communityId);
        const deleteFollow = params.deleteFollow && typeof params.deleteFollow === "boolean";

        if(!user.id || !communityId) return {error:"BAD_REQUEST"}
        try {
            await this._communitiesData.createFollow(user.id, {deleteFollow, communityId});
            return({message:"SUCCESS"})
        } catch(e) {
            return {error: "INTERNAL_ERROR"}
        }
    }

    public createCommunity = async(user:any, community:CreateCommunity) => {
        const creator = this._communitiesUtils.checkId(user.id);
        const name = this._communitiesUtils.checkName(community.name);
        const description = this._communitiesUtils.checkDescription(community.description);
        const followerNickname = this._communitiesUtils.checkFollowerNickname(community.followerNickname)
        console.log(creator, name, description, followerNickname);
        if(
            !creator || 
            !name || 
            !description || 
            !followerNickname
        ) {
            return {error: "BAD_COMMUNITY"}
        }

        if(community.followerNickname.trim() === "") {
            community.followerNickname = "uniter";
        }

        if (!this._communitiesUtils.checkUrl(community.bgUrl)) {
            community.bgUrl = ""
        }

        if(!this._communitiesUtils.checkUrl(community.iconUrl)) {
            community.iconUrl = ""
        }

        const communitySchema:CreateCommunity = {
            name: community.name.replace(/\s+/g, "-"),
            description: community.description,
            creator: user.id,
            followerNickname: community.followerNickname,
            bgUrl: community.bgUrl,
            iconUrl: community.iconUrl,
        }
        try{
            await this._communitiesData.createCommunity(communitySchema)
            return true;
        } catch(e:any) {
            if(e.detail) {
                return {error: "COMMUNITY_EXIST"}
            } else {
                return {error: "INTERNAL_ERROR"}
            }
        }
    }
}

export default CommunitiesService;