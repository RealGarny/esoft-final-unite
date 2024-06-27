import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("permissions").del();

    // Inserts seed entries
    await knex("permissions").insert([
        { title: "selectUsers", route: "api/users/", method: "GET" },
        { title: "createCommunity", route: "api/communities/", method: "POST" }
    ]);
};
