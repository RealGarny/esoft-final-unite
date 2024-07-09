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
            await this._communitiesData.createPost({authorId, content, communityId})
            return true;
        } catch(e:any) {
            if(e.detail) {
                console.log(e.detail)
                return {error: "BAD_POST"}
            } else {
                console.log(e)
                return {error: "INTERNAL_ERROR"}
            }
        }
    }

    public updateCommunity = (communityChanges:Partial<CreateCommunity>) => {
        //TODO: UPDATE COMMUNITIES;
    }

    public getCommunities = async(params:any) => {
        if(!params) return await this._communitiesData.getCommunities();
        
        //TODO: CHECK PARAMS
        const filteredParams = params
        const result = await this._communitiesData.getCommunities(filteredParams)
        if(!result) return {error: "COMMUNITIES_NOT_FOUND"}
        return result;
    }

    public createFollow = async(user:any, communityId:any) => {
        if(!user.id || !this._communitiesUtils.checkId(communityId)) return {error:"BAD_REQUEST"}

        try {
            const res = await this._communitiesData.createFollow(user.id, communityId);
            console.log(res)
            return({message:"SUCCESS"})
        } catch(e) {
            console.log(e)
            return {error: "INTERNAL_ERROR"}
        }
    }

    public createCommunity = async(user:any, community:CreateCommunity) => {
        //TODO: TRIM ALL INCOMING STRINGS
        if(
            !this._communitiesUtils.checkId(user.id) || 
            !this._communitiesUtils.checkName(community.name) || 
            !this._communitiesUtils.checkDescription(community.description) || 
            !this._communitiesUtils.checkFollowerNickname(community.followerNickname)
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