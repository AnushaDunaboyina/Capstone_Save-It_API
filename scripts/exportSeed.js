import fs from "fs";
import knexConfig from "../knexfile.js";
import knexModule from "knex";
import { format } from 'date-fns';  // Importing date-fns to format dates easily

const knex = knexModule(knexConfig);

// Ensure the seeds directory exists
if (!fs.existsSync("./seeds")) {
  fs.mkdirSync("./seeds");
  console.log("Created 'seeds' directory.");
}

export default async function DocumentsToSeedFile() {
  console.log("Starting the export process...");

  try {
    console.log("Fetching documents from the database...");
    const documents = await knex("documents").select("*");
    console.log("Documents fetched:", documents);

    // Adjust the format for tags and createdAt
    const formattedDocuments = documents.map((doc) => {
      // Format createdAt to match "YYYY-MM-DD HH:mm:ss" format
      const formattedCreatedAt = format(new Date(doc.createdAt), 'yyyy-MM-dd HH:mm:ss');

      return {
        ...doc,
        createdAt: formattedCreatedAt,
        tags: doc.tags,  // Ensure tags is in the correct format as a JSON string
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
  await knex("documents").insert(${JSON.stringify(formattedDocuments, null, 2)});
};`;

    console.log("Generated seed data:\n", seedData);

    fs.writeFileSync("./seeds/seed_documents.js", seedData, "utf-8");
    console.log("✅ Seed file updated successfully!");
  } catch (error) {
    console.error("❌ Error exporting documents to seed file:", error);
  } finally {
    await knex.destroy();
    console.log("🔄 Database connection closed.");
  }
}

DocumentsToSeedFile();
