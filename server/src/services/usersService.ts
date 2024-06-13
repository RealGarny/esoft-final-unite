import UsersData from "../data/usersData";

type usersData = {
    login: string,
    displayedName: string,
    email: string,
    password: string
}

type userAuth = {
    login: usersData['login'],
    password: usersData['password']
}

class UsersService {
    private _usersData;
    private _userUtils;

    public constructor(usersData:any, userUtils:any) {
        this._usersData = usersData;
        this._userUtils = userUtils;
    }

    public getUsers() {
        return(this._usersData.getUsers())
    }

    public getUser(userLogin:string, params:object|undefined = undefined) {
        if(!userLogin) {
            return false;
        }

        if(!params || typeof params !== "object" || Object.keys(params).length < 1) {
            return this._usersData.getUser(userLogin);
        }

        const availibleParams = this._usersData.getPublicFields();

        let finalParams = [];

        let query = "SELECT"
        for(let key in params) {
            if(availibleParams.includes(key)) {
                finalParams.push(key);
            }
        }

        query += " " + finalParams.join(", ") + " FROM users"

        //return this._usersData.customQuery(query);
    }

    public async authUser(user:userAuth) {
        if(
            !this._userUtils.checkName(user.login) ||
            !this._userUtils.checkPassword(user.password)
        ) return false;

        const fetchedUser:usersData = await this.getUser(user.login);

        if(!fetchedUser || !this._userUtils.comparePassword(user.password, fetchedUser.password)) {
            return false;
        }

        return this._userUtils.generateToken(fetchedUser);
    }

    public async createUser(user:usersData) {

        if(!this._userUtils.checkUser(user)) return false;

        const userSchema:usersData = {
            login: user.login,
            displayedName: user.displayedName,
            email: user.email,
            password: await this._userUtils.hashPassword(user.password)
        }

        try{
            await this._usersData.createUser(userSchema);
        }catch(e) {
            return false;
        }

        return {token: this._userUtils.generateToken(userSchema)}
    }
}

export default UsersService;