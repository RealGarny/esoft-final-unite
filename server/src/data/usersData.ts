import knex from "knex";

type usersData = {
    login: string,
    displayedName: string,
    email: string,
    password: string
}

class UsersData {
    private _db:knex.Knex;

    public constructor(model:any) {
        this._db = model;
    }

    //get users specific params
    public getUsers(params:any):Promise<usersData[]> | undefined {

        if(!params || Object.keys(params).length < 1) {
            return undefined;
        }

        let query = this._db('users');

        if(params.type && typeof params.type === "string") {
            switch(params.type) {
                case "userpage": 
                    query.select("displayedName", "login", "createdAt")
                    break;
                case "full":
                    query.select("*")
                    break;
                default:
                    query.select("displayedName", "login", "createdAt")
            }
        } else {
            query.select("displayedName", "login", "createdAt")
        }

        if(params.login) {
            query.where('login', params.login)
            .first()
        }
        return query.then((res:any) => res)
    }

    public createUser(userData:usersData) {
        return this._db('users').insert(userData);
    }

    public updateUser(data:any, userId:number) {
        if(typeof data !=='object') return null;

        return this._db('users')
        .where('id', userId)
        .update(data)
    }

    public getRolePermissions(userRole:number|number[]) {
        if(typeof userRole !== "number" || !Array.isArray(userRole)) {
            throw new Error("userRole is not of type numer or array")
        }

    }
}

export default UsersData;