type usersData = {
    uid: string,
    login: string,
    displayedName: string,
    email: string,
    password: string
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

    public getUser(userLogin:string, params:object) {
        if(!userLogin || !params) {
            return;
        }

        const userParamsKeys = Object.keys(params);

        if(userParamsKeys.length < 1) {
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
        console.log(query);
        //return this._usersData.customQuery(query);
    }

    public async createUser(user:usersData) {

        if(
            !this._userUtils.checkName(user.displayedName) ||
            !this._userUtils.checkName(user.login) ||
            !this._userUtils.checkEmail(user.email) || 
            !this._userUtils.checkPassword(user.password)
        ) return false;
        console.log(this._userUtils.generateUid())
        const userSchema:usersData = {
            uid: this._userUtils.generateUid(),
            login: user.login,
            displayedName: user.displayedName,
            email: user.email,
            password: await this._userUtils.hashPassword(user.password)
        }

        try{
            const createdUser = await this._usersData.createUser(userSchema);
        }catch(e) {
            console.log(e)
            return false;
        }

        return {token: this._userUtils.generateToken(userSchema)}
    }
}

export default UsersService;