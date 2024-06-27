import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("roles", (table) => {
        table.enu('role', ['user', 'moderator', 'admin'], {
            enumName: 'eRoles',
            useNative: true,
        })
            .unique()
            .notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('roles');
}

