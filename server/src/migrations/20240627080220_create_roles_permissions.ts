import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('roles_permissions', (table) => {
        table.increments('id')
        table.integer('permissionId')
            .notNullable()
            .references('id')
            .inTable('permissions')
            .onDelete('CASCADE')
        table.integer('roleId')
            .notNullable()
            .references('id')
            .inTable('roles')
            .onDelete('CASCADE')
        table.primary(['permissionId', 'roleId'])
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('roles_permissions')
}

