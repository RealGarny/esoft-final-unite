import { $tokenHost } from ".";
import { useNavigate } from "../utils/router";
import routes from "../routes/routes";

class communityAPI {

    public static updateCommunity = async(communityId:number, updatedParams:object) => {
        //TODO: update logic
    }

    public static deleteCommunity = async(communityId:number) => {
        //TODO: delete logic
    }

    public static createCommunity = async (communityData:object) => {
        try{
            const navigate = useNavigate();
            await $tokenHost.post('api/communities', {name, description, followerNickname}, {withCredentials: true});
            navigate(routes.community(name))
        } catch(e:any) {
            if(e.response.data.message) {
                return({error: e.response.data.message})
            } else {
                return({error: "INTERNAL_ERROR"})
            }
        }
    }
}

export default new communityAPI();