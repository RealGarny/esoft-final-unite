import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('communities', (table) => {
        table.increments('id')
        table.string('name')
            .primary()
            .notNullable()
            .unique()
        table.string('description')
        table.integer('creator')
            .references('id')
            .inTable('users')
            .onDelete('SET NULL')
        table.integer('followCount')
            .defaultTo(0)
        table.string('followerNickname')
        table.string('bgUrl')
        table.string('iconUrl')
        table.timestamps(true, true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('communities');
}

