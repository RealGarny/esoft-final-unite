import $host from ".";
import jwtDecode from "../utils/jwtDecode";
type UserRegistration = (email:string, displayedName: string, login: string, password:string) => void;
type UserAuthorization = (login:string, password:number) => {error:string} | any;

class userAPI {

    public static registration:UserRegistration = async (email, displayedName, login, password) => {
        try {
            const {data} = await $host.post('/users', {email, displayedName, login, password}, {withCredentials: true});
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
            const {data} = await $host.post('/users/auth', {login, password}, {withCredentials: true});
            return(data.accessToken);
        } catch(e:any) {
            console.log(e)
            if(e.response.data.message) {
                return({error: e.response.data.message})
            } else {
                return({error: "INTERNAL_ERROR"})
            }
        }
    }

    public static deleteUser() {
        //TODO: delete logic
    }

    public static updateUser() {
        //TODO: update logic
    }
}

export default userAPI;