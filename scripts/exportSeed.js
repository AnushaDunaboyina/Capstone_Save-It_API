import fs from "fs";
import knexConfig from "../knexfile.js";
import knexModule from "knex";
import { format } from "date-fns";

const knex = knexModule(knexConfig);

// Ensure the seeds directory exists
if (!fs.existsSync("./seeds")) {
  fs.mkdirSync("./seeds");
}

export default async function DocumentsToSeedFile() {
  try {
    const documents = await knex("documents").select("*");

    const formattedDocuments = documents.map((doc) => {
      const formattedCreatedAt = format(
        new Date(doc.createdAt),
        "yyyy-MM-dd HH:mm:ss"
      );

      return {
        ...doc,
        createdAt: formattedCreatedAt, // Ensure consistent date formatting
        // No need to parse tags as they are already in array format
        tags: doc.tags,
        filepath: doc.filepath, // Keep the relative static path
      };
    });

    // Generate the correct seed file format
    const seedData = `/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("documents").del();
  // Inserts seed entries
  await knex("documents").insert(${JSON.stringify(
    formattedDocuments,
    null,
    2
  )});
};`;

    // Write to seed_documents.js file
    fs.writeFileSync("./seeds/seed_documents.js", seedData, "utf-8");
  } catch (error) {
    console.error("Error exporting documents to seed file:", error);
  } finally {
    await knex.destroy();
  }
}

DocumentsToSeedFile();
