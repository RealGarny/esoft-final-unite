import $host from ".";
import jwtDecode from "../utils/jwtDecode";
type UserRegistration = (email:string, displayedName: string, login: string, password:string) => void;
type UserAuthorization = (login:string, password:number) => void;

class userAPI {

    public static registration:UserRegistration = async (email, displayedName, login, password) => {
        try {
            const {data} = await $host.post('api/users', {email, displayedName, login, password}, {withCredentials: true});
            localStorage.setItem('accessToken', data.accessToken);
            return(jwtDecode(data.accessToken));
        }
        catch(e:any) {
            if(e.response.data.message) {
                return({error: e.response.data.message})
            } else {
                return({error: "INTERNAL_ERROR"})
            }
        }
    }

    public static authorization:UserAuthorization = async (login, password) => {
        try{
            const {data} = await $host.post('api/users/auth', {login, password}, {withCredentials: true});
            localStorage.setItem('accessToken', data.accessToken);
            return(jwtDecode(data.accessToken));
        } catch(e:any) {
            if(e.response.data.message) {
                return({error: e.response.data.message})
            } else {
                return({error: "INTERNAL_ERROR"})
            }
        }
    }
}

export default userAPI;