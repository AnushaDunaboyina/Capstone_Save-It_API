/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("notes", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.json("tags").nullable(); // JSON column for tags
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable("notes");
}
