import knex from "knex";
import defaultKnexConfig from "../knexfile";

class knexModel {
    private _dbHandle:knex.Knex;
    public constructor(config:any = undefined) {
        this._dbHandle = knex(config ? config : defaultKnexConfig)
    }
    public getConHandler() {
        return this._dbHandle;
    }
}

export default knexModel;