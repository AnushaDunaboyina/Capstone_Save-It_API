import initKnex from "knex";
import configuration from "./knexfile.js"; // Adjust the path to your knexfile.js

const knex = initKnex(configuration);

const updateFilepath = async () => {
  try {
    console.log("Updating file paths in the database...");
    await knex("documents")
      .update({
        filepath: knex.raw(
          "CONCAT('/uploads-documents/', SUBSTRING_INDEX(filepath, '\\\\', -1))"
        ),
      })
      .where("filepath", "like", "C:%");

    console.log("File paths updated successfully!");
  } catch (error) {
    console.error("Error updating file paths:", error);
  } finally {
    knex.destroy(); // Close the database connection
  }
};

updateFilepath();
