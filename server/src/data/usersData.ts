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
    public async getUser(param:object):Promise<usersData[]> {

        return this._db.from<usersData>('users')
            .where(param)
            .first();
    }

    public async createUser(userData:usersData) {
        return this._db('users').insert(userData);
    }

    public async updateUser(userId:number, data:object) {
        return this._db('users')
        .where('id', userId)
        .update(data)
    }

    public customQuery(query:string) {
        return {query};
    }
}

export default UsersData;