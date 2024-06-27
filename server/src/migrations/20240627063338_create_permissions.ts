import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('permissions', (table) => {
        table.enu('permission', ['banUser', 'createPost', 'teapot'], {
            enumName: 'ePermissons',
            useNative: true,
        })
            .unique()
            .notNullable()
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('permissions');
}

