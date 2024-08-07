import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("roles").del();

    // Inserts seed entries
    await knex("roles").insert([
        { title: "user" },
        { title: "moderator" },
        { title: "admin" },
        { title: "creator" },
        { title: "blocked"},
    ]);
};
