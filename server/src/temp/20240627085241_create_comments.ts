import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('comments', (table) => {
        table.increments('commentId')
        table.integer('author')
            .references('id')
            .inTable('users')
            .onDelete('SET NULL')
        table.string('content', 1500)
            .notNullable()
        table.integer('postId')
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE')
        table.dateTime('createdAt')
            .defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('comments');
}



