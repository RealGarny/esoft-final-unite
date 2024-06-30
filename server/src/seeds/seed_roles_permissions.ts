import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("roles_permissions").del();

    // Inserts seed entries
    await knex("roles_permissions").insert([
        { permissionId: 1, roleId: 1 },
        { permissionId: 2, roleId: 1 },
        { permissionId: 1, roleId: 2 },
        { permissionId: 2, roleId: 2 },
    ]);
};
