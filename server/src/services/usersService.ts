
class UsersService {
    private _usersData;

    public constructor(usersData:any) {
        this._usersData = usersData;
    }

    public getUsers() {
        return(this._usersData.getUsers())
    }
}

export default UsersService;