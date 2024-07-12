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

    private getUserSecured(query:any, userTag:string) {
        return query.select(
            `${userTag}.id`,
            `${userTag}.login`,
            `${userTag}.displayedName`,
            `${userTag}.globalRole`,
            `${userTag}.bgUrl`,
            `${userTag}.iconUrl`,
            `${userTag}.createdAt as userCreatedAt`,
            `${userTag}.updatedAt as userUpdatedAt`,
        )
    }

    //get users specific params
    public getUsers(params:any):Promise<usersData[]> | undefined {

        if(!params || Object.keys(params).length < 1) {
            return undefined;
        }

        let query = this._db('users');
        if(params.type !== "full"){
            this.getUserSecured(query, 'users');
        } else {
            query.select("*")
        }

        if(params.limit) {
            query.limit(params.limit)
        }
        if(params.id || params.login || params.displayedName) {
            if(params.id) {
                query.where({'users.id': params.id})
            }else if(params.login) {
                query.where({login:params.login})
            } else {
                query.where({displayedName:params.displayedName})
            }
            query.first()
        }
        return query.then((res:any) => res)
    }

    public createUser(userData:usersData) {
        return this._db('users').insert(userData);
    }

    public updateUser(data:any, userId:number) {
        if(!data || typeof data !== "object" || Object.keys(data).length < 1) return null;
        console.log(typeof data.iconUrl);
        return this._db('users').where({id:userId}).update(data)
    }

    public getRolePermissions(userRole:number|number[]) {
        if(typeof userRole !== "number" || !Array.isArray(userRole)) {
            throw new Error("userRole is not of type numer or array")
        }

    }
}

export default UsersData;