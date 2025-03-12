/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema.createTable("documents", (table) => {
    table.increments("id").primary();
    table.string("filename").notNullable();
    table.string("filepath").notNullable();
    table.json("tags");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("documents");
}
