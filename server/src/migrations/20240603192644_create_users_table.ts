import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
        table.uuid("uid").defaultTo(knex.fn.uuid())
            .unique()
            .primary()
        table.string("login")
            .unique()
            .primary()
            .notNullable()
        table.string("displayedName")
            .notNullable()
        table.string("password")
            .notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users')
}

