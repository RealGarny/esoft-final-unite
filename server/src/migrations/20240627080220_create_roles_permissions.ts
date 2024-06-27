import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('roles_permissions', (table) => {
        table.increments('id')
        table.integer('permissionId')
            .primary()
            .notNullable()
            .references('id')
            .inTable('permissions')
            .onDelete('CASCADE')
        table.integer('roleId',)
            .primary()
            .notNullable()
            .references('id')
            .inTable('roles')
            .onDelete('CASCADE')
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('roles_permissions')
}

