import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_followers', (table) => {
        table.increments("id")
            .primary()
        table.integer("userId")
            .references('id')
            .inTable('users')
            .onDelete("CASCADE")
        table.integer("followerId")
            .references('id')
            .inTable('users')
            .onDelete("CASCADE")
            table.primary(['userId', 'followerId'])
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('user_followers');
}
