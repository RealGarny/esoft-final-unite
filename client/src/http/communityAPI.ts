import { $tokenHost } from ".";
import errorList from "../utils/errorList";
import { AxiosError } from "axios";

type GetCommunities = {
    name?:string,

}

type FollowData = {
    followType: boolean,
    userId: number,
    communityId: number
}

class communityAPI {

    public static getCommunities = async(params:GetCommunities) => {
        try {
            const {data} = await $tokenHost.get('communities', {params})
            return data;
        } catch(e) {
            if(e instanceof AxiosError) {
                return null;
            }
        }
    }

    public static getPosts = async(params:any) => {
        try {
            const {data} = await $tokenHost.get('communities/posts', {params})
            return data;
        } catch(e) {
            if(e instanceof AxiosError) {
                return null;
            }
        }
    }

    public static createPost = async(params:any) => {
        try {
            const {data} = await $tokenHost.post('communities/posts', params)
            return data;
        } catch(e) {
            if(e instanceof AxiosError) {
                return null;
            }
        }
    }

    public static updateCommunity = async(params:any) => {
        if(typeof params !== 'object') throw new Error('params of invalid type');
        try{
            $tokenHost.patch('/communities', params);
            return true;
        }catch(e) {
            return false;
        }
    }

    public static deleteCommunity = async(communityId:number) => {
        //TODO: delete logic
    }

    public static setFollow = async(followData:FollowData) => {
        try {
            $tokenHost.post('communities/follow', followData)
            return true;
        } catch(e) {
            return e;
        }
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