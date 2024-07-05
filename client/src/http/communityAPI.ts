import { $tokenHost } from ".";
import errorList from "../utils/errorList";

class communityAPI {

    public static getCommunities = async() => {
        //TODO: get logic
    }

    public static updateCommunity = async(communityId:number, updatedParams:object) => {
        //TODO: update logic
    }

    public static deleteCommunity = async(communityId:number) => {
        //TODO: delete logic
    }

    public static createCommunity = async (communityData:any) => {
        if(!communityData || typeof communityData !== "object") {
            return this._createError("BAD_COMMUNITY")
        }
        try{
            await $tokenHost.post('communities', communityData, {withCredentials: true});
        } catch(e:any) {
            if(e.response.data.message) {
                return this._createError(e.response.data.message)
            } else {
                return this._createError("INTERNAL_ERROR")
            }
        }
    }

    private static _createError(error:Parameters<typeof errorList>[0]) {
        return({error: errorList(error)})
    }
}

export default communityAPI;