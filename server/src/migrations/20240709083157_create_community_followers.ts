import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('community_followers', (table) => {
        table.increments("id")
        table.integer("userId")
            .references('id')
            .inTable('users')
            .onDelete("CASCADE")
        table.integer("communityId")
            .references('id')
            .inTable('communities')
            .onDelete("CASCADE")
        table.primary(['userId', 'communityId'])
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('community_followers');
}

