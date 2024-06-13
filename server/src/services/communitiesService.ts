
class CommunitiesService {
    private _communitiesData;

    public constructor(communitiesData:any) {
        this._communitiesData = communitiesData;
    }

    public createCommunity(header:any, community:any) {
        return true
    }
}

export default CommunitiesService;