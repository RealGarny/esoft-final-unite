import dotenv = require('dotenv');
import type { Knex } from "knex";
dotenv.config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      database: "Unite",
      user: "postgres",
      password: 'admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "migrations"
    }
  }
};

const defaultKnexConfig = config.development

export default defaultKnexConfig;
