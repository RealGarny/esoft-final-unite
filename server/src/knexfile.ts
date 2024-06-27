import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "migrations"
    },
    seeds: {
      directory: './seeds'
    }
  }
};

const defaultKnexConfig = config.development

export default defaultKnexConfig;
