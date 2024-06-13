import type { Knex } from "knex";

/*
    bgURL: "https://media.cdn.community.lambdageneration.com/backgrounds/1694882926930B4CsCjBrB2CfBUXB.png?size=search",
    iconURL: "https://media.cdn.community.lambdageneration.com/avatars/1694882926817D8CbBPDqgtBDB7CC.png?size=mega",
    primaryColor: "#",
    CID: "source",
    CName: "Source",
    CDescrition: "A subcommunity focused to all games and mods made on the Source engine. Share news, WIPs, playthroughs, and troubleshoot your mod/Hammer with others!",
    CFollowCount: 10231,
    CFollowersNickname: "Enthusiasts"
*/


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("communities", (table) => {
        table.increments("id")
            .primary()
        table.string("name")
            .unique()
            .primary()
            .notNullable()
        table.string("description", 200)
        table.integer("followCount")
            .unsigned()
            .defaultTo(0)
        table.string("followerNickname", 30)
            .unsigned()
        table.string("bgUrl")
        table.string("iconUrl")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("communities");
}

