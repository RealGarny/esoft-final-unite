import $host from ".";
type UserRegistration = (email:string, displayedName: string, login: string, password:string) => void;
type UserAuthorization = (login:string, password:number) => void;

class userAPI {

    public static registration:UserRegistration = async (email, displayedName, login, password) => {
        const {data} = await $host.post('api/users', {email, displayedName, login, password}, {withCredentials:true});
        console.log(data);
    }

    public static authorization:UserAuthorization = async (login, password) => {
        const {data} = await $host.post('api/users', {login, password}, {withCredentials:true});
        console.log(data);
    }
}

export default userAPI;