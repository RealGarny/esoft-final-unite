import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    console.log(knex.fn.uuid)
    return knex.schema.createTable("users", (table) => {
        table.increments("id")
        table.string("login")
            .unique()
            .notNullable()
        table.string("email")
            .unique()
        table.string("displayedName")
            .notNullable()
        table.string("password")
            .notNullable()
        table.integer("globalRole")
            .references('id')
            .inTable('roles')
            .defaultTo(0)
        table.timestamps(true, true, true)
        table.timestamp('lastSeen')
            .defaultTo(knex.fn.now())
        table.string("refreshToken", 1000)
            
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users')
}
