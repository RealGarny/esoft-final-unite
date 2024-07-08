import $host,{ $tokenHost } from ".";
import errorList from "../utils/errorList";
import { AxiosError } from "axios";

type GetCommunities = {
    name?:string,

}

class communityAPI {

    public static getCommunities = async(params:GetCommunities) => {
        try {
            const {data} = await $host.get('communities', {params})
            return data;
        } catch(e) {
            if(e instanceof AxiosError) {
                return null;
            }
        }
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
            await $tokenHost.post('communities', communityData);
        } catch(e:any) {
            if(e instanceof AxiosError && e.response?.data.error) {
                return this._createError(e.response?.data.error);
            }
        }
    }

    private static _createError = (error:Parameters<typeof errorList>[0]) => {
        return({error: errorList(error)})
    }
}

export default communityAPI;