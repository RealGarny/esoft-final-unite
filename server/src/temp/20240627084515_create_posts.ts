import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id')
        table.integer('authorId')
            .references('id')
            .inTable('users')
            .onDelete('SET NULL')
        table.integer('communityId')
            .references('id')
            .inTable('communities')
            .onDelete('CASCADE')
        table.string('content', 1500)
            .notNullable()
        table.timestamps(true, true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('posts');
}