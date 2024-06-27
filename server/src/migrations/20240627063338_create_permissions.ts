import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('permissions', (table) => {
        table.increments('id')
        table.string('title', 100)
        table.string('route')
            .notNullable()
        table.enu('method', ['GET', 'POST', 'PATCH', 'DELETE'])
            .notNullable()
        table.boolean('active')
            .defaultTo(true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('permissions');
}

