
class UsersService {
    private _usersData;

    public constructor(usersData:any) {
        this._usersData = usersData;
    }

    public createUser() {
        return(this._usersData.createUser())
    }
}

export default UsersService;