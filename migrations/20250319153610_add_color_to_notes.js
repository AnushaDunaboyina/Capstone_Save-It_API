/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.alterTable("notes", (table) => {
      table.string("color").defaultTo("white"); // Adding a new column with a default value
    });
  }
  
  export function down(knex) {
    return knex.schema.alterTable("notes", (table) => {
      table.dropColumn("color"); // Rolling back this change
    });
  }
  
