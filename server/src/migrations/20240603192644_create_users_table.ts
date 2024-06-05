import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    console.log(knex.fn.uuid)
    return knex.schema.createTable("users", (table) => {
        table.uuid("uid")
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

