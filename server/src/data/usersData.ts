import knex from "knex";

type usersData = {
    login: string,
    displayedName: string,
    email: string,
    password: string
}

const data:usersData[] = [
    {
        login: "Peter",
        displayedName: "Boeing",
        email: "finpin@mail.ru",
        password: "faej3f39qfjaof"
    }
]

class UsersData {
    private _db:knex.Knex;

    private _publicFields:string[] = ["login", "displayedName", "description"];
    private _permittedFields:string[] = ["email", "password"];

    public constructor(model:any) {
        this._db = model;
    }

    public getUsers() {
        return(data);
    }

    public getPermittedFields() {
        return this._permittedFields;
    }

    public getPublicFields() {
        return this._publicFields;
    }

    //get user by his login
    public async getUser(userLogin:string):Promise<usersData[]> {

        return this._db.from<usersData>('users')
            .where('login', userLogin)
            .first();
    }

    public async createUser(userData:usersData) {
        return this._db('users').insert(userData);
    }

    public customQuery(query:string) {
        return {query};
    }
}

export default UsersData;