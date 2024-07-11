import $host, { $tokenHost } from ".";
import errorList from "../utils/errorList";
import { AxiosError } from "axios";

type UserRegistration = (email:string, displayedName: string, login: string, password:string) => void;
type UserAuthorization = (login:string, password:number) => {error:string} | any;

class userAPI {

    public static checkAuth = async() => {
        try {
            const {data} = await $host.get("/users/checkAuth", {withCredentials: true})
            return data.accessToken;
        } catch(e) {
            if(e instanceof AxiosError) {
                if(e.response?.status === 401) {
                    return null;
                }
            }
        }
        return undefined;
    }

    public static registration:UserRegistration = async (email, displayedName, login, password) => {
        try {
            const {data} = await $host.post('/users', {email, displayedName, login, password}, {withCredentials: true});
            return data.accessToken
        }
        catch(e:any) {
            if(e.response.data.message) {
                return(this._createError(e.response.data.message))
            } else {
                return(this._createError("INTERNAL_ERROR"))
            }
        }
    }

    public static getUsers = async(params:any) => {
        try {
            const { data } = await $tokenHost.get(`/users`, {params})
            return data;
        } catch(e) {
            return null;
        }
    }

    public static authorization:UserAuthorization = async (login, password) => {
        try{
            const {data} = await $host.post('/users/auth', {login, password}, {withCredentials: true});
            return(data.accessToken);
        } catch(e:any) {
            if(e.response.data.message) {
                return(this._createError(e.response.data.message))
            } else {
                return(this._createError("INTERNAL_ERROR"))
            }
        }
    }

    private static _createError = (error:Parameters<typeof errorList>[0]) => {
        return({error: errorList(error)})
    }

    public static deleteUser() {
        //TODO: delete logic
    }

    public static updateUser = async(params:any) => {
        try {
            await $tokenHost.patch(`/users`, params)
            return true;
        } catch(e) {
            return false;
        }
    }
}

export default userAPI;