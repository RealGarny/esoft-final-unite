type usersData = {
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

    public async createUser(user:usersData) {

        if(
            !this._userUtils.checkName(user.displayedName) ||
            !this._userUtils.checkName(user.login) ||
            !this._userUtils.checkEmail(user.email) || 
            !this._userUtils.checkPassword(user.password)
        ) return false;

        const userSchema:usersData = {
            login: user.login,
            displayedName: user.displayedName,
            email: user.email,
            password: await this._userUtils.hashPassword(user.password)
        }

        console.log(userSchema);

        const createdUser = await this._usersData.createUser();

        if(!createdUser) {
            return false;
        }

        return {token: this._userUtils.generateToken(userSchema)}
    }
}

export default UsersService;