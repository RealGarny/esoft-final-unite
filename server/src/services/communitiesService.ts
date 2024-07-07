type CreateCommunity = {
    name: string,
    description: string,
    creator: number,
    followerNickname: string,
    bgUrl: string,
    iconUrl: string,
}

class communitiesUtils {
    private static _urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
    private static _communityConfig = {
        nameMinLen: 3,
        nameMaxLen: 21,
        descriptionMaxLen: 300,
        nicknameMaxLen: 25
    }

    private static _checkString(string:string) {
        return (!!string || string === "") && typeof string === "string";
    }

    private static _checkNumber(number:number) {
        return !!number && typeof number === "number";
    }

    static checkUrl(url:string) {
        return this._checkString(url) && this._urlRegex.test(url)
    }

    static checkName(name:string) {
        return this._checkString(name)
        && name.length >= this._communityConfig.nameMinLen
        && name.length <= this._communityConfig.nameMaxLen
    }

    static checkDescription(description:string) {
        console.log(this._checkString(description)
        && description.length <= this._communityConfig.descriptionMaxLen)
        return this._checkString(description)
        && description.length <= this._communityConfig.descriptionMaxLen
    }

    static checkCreator(creatorId:number) {
        return this._checkNumber(creatorId);
    }

    static checkFollowerNickname(nickname:string) {
        return (this._checkString(nickname)
        && nickname.length <= this._communityConfig.nicknameMaxLen) || nickname === ""
    }
}

class CommunitiesService {
    private _communitiesData;

    public constructor(communitiesData:any) {
        this._communitiesData = communitiesData;
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

    public createCommunity = async(user:any, community:CreateCommunity) => {
        //TODO: TRIM ALL INCOMING STRINGS
        if(
            !communitiesUtils.checkCreator(user.id) || 
            !communitiesUtils.checkName(community.name) || 
            !communitiesUtils.checkDescription(community.description) || 
            !communitiesUtils.checkFollowerNickname(community.followerNickname)
        ) {
            return {error: "BAD_COMMUNITY"}
        }

        if(community.followerNickname.trim() === "") {
            community.followerNickname = "uniter";
        }

        if (!communitiesUtils.checkUrl(community.bgUrl)) {
            community.bgUrl = ""
        }

        if(!communitiesUtils.checkUrl(community.iconUrl)) {
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