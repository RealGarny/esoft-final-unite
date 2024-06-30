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

    //get user by his login
    public getUser(param:object):Promise<usersData[]> {

        return this._db.from<usersData>('users')
            .where(param)
            .first();
    }

    public createUser(userData:usersData) {
        return this._db('users').insert(userData);
    }

    public updateUser(userId:number, data:object):Promise<any[]> {
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