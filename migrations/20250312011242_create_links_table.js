/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.createTable("links", (table) => {
    table.increments("id").primary();
    table.string("url").notNullable();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("thumbnail");
    table.json("tags");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("links");
}
