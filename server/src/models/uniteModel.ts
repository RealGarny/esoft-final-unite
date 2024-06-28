import knex from "knex";
import defaultKnexConfig from "../knexfile";

const uniteModel = () => {
    return knex(defaultKnexConfig)
}

export default uniteModel();