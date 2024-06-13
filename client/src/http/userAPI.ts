import $host from ".";
type UserRegistration = (email:string, displayedName: string, login: string, password:string) => void;

class userAPI {

    public static registration:UserRegistration = async (email, displayedName, login, password) => {
        const {data} = await $host.post('api/users', {email, displayedName, login, password});
        console.log(data);
    }
}

export default userAPI;