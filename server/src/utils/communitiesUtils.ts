import ServiceUtil from "./serviceUtil"

type community = {
    name: string,
    description: string,
    followerNickname: string,
    bgUrl?: string,
    iconUrl?: string
}

class CommunitiesUtils extends ServiceUtil {

    private static _communityConfig = {
        nameMaxLen: 20,
        nameMinLen: 3,
        descriptionMaxLen: 200,
        followerNicknameMaxLen: 25,
        followerNicknameMinLen: 3,
        postContentMaxLen: 500
    }
    
    public static checkCommunity(community:community) {
        
    }

    public static checkName(name:string) {
        const str = this.checkString(name)
        if(str &&
            str.length >= this._communityConfig.nameMinLen &&
            str.length <= this._communityConfig.nameMaxLen
        ) {
            return str;
        }
        return null;
    }

    public static checkDescription(description:string) {
        const str = this.checkString(description)
        if(str && str.length <= this._communityConfig.descriptionMaxLen) {
            return str;
        }
        return null;
    }

    public static checkUrl(url:string) {
        return this.checkString(url) && this._urlRegex.test(url)
    }

    public static checkId(creatorId:number) {
        return this.checkNumber(creatorId);
    }

    public static checkFollowerNickname(nickname:string) {
        const str = this.checkString(nickname)
        if((str
            && str.length >= this._communityConfig.followerNicknameMinLen
            && str.length <= this._communityConfig.followerNicknameMaxLen) || nickname === ""
        ) {
            return str;
        }
        return null;
    }

    public static checkPostContent(content:string) {
        const str = this.checkString(content);
        if((str
            && str !== ""
            && str.length <= this._communityConfig.followerNicknameMaxLen)
        ) {
            return str;
        }
        return null;
    }
}

export default CommunitiesUtils;