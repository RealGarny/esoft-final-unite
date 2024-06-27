import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('roles_permissions', (table) => {
        table.specificType('permissionId', 'ePermissions')
            .primary()
            .notNullable()
            .references('permission')
            .inTable('permissions')
            .onDelete('CASCADE')
        table.specificType('roleId', 'eRoles')
            .primary()
            .notNullable()
            .references('role')
            .inTable('roles')
            .onDelete('CASCADE')
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('roles_permissions')
}

