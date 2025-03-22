import initKnex from "knex";
import configuration from "../knexfile.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  parseAndValidateTags,
  safelyDeleteFile,
} from "../helpers/tagHelper.js";

// Define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knex = initKnex(configuration);

// Get all documents
const index = async (req, res) => {
  try {
    const data = await knex("documents").select(
      "id",
      "filename",
      "filepath",
      "createdAt",
      knex.raw("JSON_UNQUOTE(JSON_EXTRACT(tags, '$')) as tags")
    );

    // Normalize filepaths to ensure they are relative public URLs
    const normalizedData = data.map((doc) => {
      if (!doc.filepath.startsWith("/uploads-documents/")) {
        // Convert absolute paths to relative URLs
        const filename = path.basename(doc.filepath); // Extract the file name
        doc.filepath = `/uploads-documents/${filename}`;
      }
      return doc;
    });

    res.status(200).json(normalizedData); // Send the fetched documents as JSON response
  } catch (error) {
    res.status(500).send(`Error retrieving documents: ${error}`); // Send eror response if there's an issue
  }
};

// GET a single document
const findDocument = async (req, res) => {
  try {
    const document = await knex("documents")
      .where({ id: req.params.id })
      .first(); // Fetch a document with the specified ID from the database

    if (!document) {
      // Check if the document exists
      return res.status(404).json({
        message: `Document with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json(document); // Send the fetched document as JSON response
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve document with ID ${req.params.id}: ${error.message}`,
    });
  }
};

// POST or ADD a new document (using a middleware like 'multer' for file uploads)
const addDocument = async (req, res) => {
  try {
    const file = req.file; // Get the uploaded file from the request
    const { filename, tags } = req.body;

    if (!filename || filename.trim() === "") {
      safelyDeleteFile(file.path); // Delete temporary uploaded file

      return res.status(400).json({
        message: "Filename is required. Please provide a valid name.",
      });
    }

    if (!file) {
      return res.status(400).json({
        message: "File is missing. Please upload a valid file.",
      });
    }

    // Validate tags
    let tagsArray;
    try {
      tagsArray = parseAndValidateTags(tags);
    } catch (error) {
      safelyDeleteFile(file.path); // Clean up temporary file

      return res.status(400).json({ message: error.message });
    }

    // Sanitize the filename
    const sanitizedFilename = filename.trim().replace(/\s+/g, "_");
    const fileExtension = path.extname(file.originalname);

    // Define the new path
    const publicUrl = `/uploads-documents/${sanitizedFilename}${fileExtension}`;

    const newPath = path.join(
      __dirname,
      "../uploads-documents",
      `${sanitizedFilename}${fileExtension}`
    );

    // Check for filename conflict and inform the user
    if (fs.existsSync(newPath)) {
      safelyDeleteFile(file.path); // Deletes the temporary file to save memory

      return res.status(400).json({
        message: `A file named "${sanitizedFilename}${fileExtension}" already exists. Please use a different filename.`,
      });
    }

    // Rename the file
    fs.renameSync(file.path, newPath);

    // Create a new document object with file details
    const newDocument = {
      filename: sanitizedFilename,
      filepath: publicUrl, // Store the public URL
      tags: JSON.stringify(tagsArray), // Store tags as an array
      createdAt: new Date(),
    };

    const result = await knex("documents").insert(newDocument); // Insert the new document into the database and get the inserted ID
    const newDocumentId = result[0];

    // Retrieve and send the created document
    const createdDocument = await knex("documents")
      .where({ id: newDocumentId })
      .first();

    res
      .status(201)
      .json({ message: "File uploaded successfully", createdDocument }); // Send the created document as JSON response
  } catch (error) {
    safelyDeleteFile(req.file?.path); // Clean up the uploaded file if an error occurs
    console.error("Error in addDocument:", error);
    res.status(500).json({
      message: "An unexpected error occurred while uploading the document.",
      error: error.message, // Send error response if there's an issue
    });
    console.error("Error in addDocument:", error);
  }
};

// Edit /Update a document by ID (PATCH)
const updateDocument = async (req, res) => {
  try {
    const { filename, tags } = req.body;

    // Validate filename and tags
    if (!filename || filename.trim() === "") {
      return res.status(400).json({ message: "Filename is required." });
    }

    // Handle both array and JSON string formats for tags
    let tagsArray;
    if (Array.isArray(tags)) {
      // Tags already in array format
      tagsArray = tags.map((tag) => tag.trim());
    } else if (typeof tags === "string") {
      try {
        tagsArray = parseAndValidateTags(tags); // Parse JSON string
      } catch (error) {
        return res.status(400).json({
          message: "Invalid tags format. Tags must be a JSON array or string.",
        });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Tags must be a JSON string or an array." });
    }

    // Update the document in the database
    const fieldsUpdated = await knex("documents")
      .where({ id: req.params.id })
      .update({
        filename: filename.trim(),
        tags: JSON.stringify(tagsArray), // Save tags as a JSON string
      });

    // Check if the document was updated
    if (fieldsUpdated === 0) {
      return res.status(404).json({
        message: `Document with ID ${req.params.id} not found or no changes made.`,
      });
    }

    // Fetch the updated document and send as response
    const updatedDocument = await knex("documents")
      .where({ id: req.params.id })
      .first();

    res.status(200).json(updatedDocument); // Send the updated document as response
  } catch (error) {
    console.error(`Error updating document ID ${req.params.id}:`, error);
    res.status(500).json({
      message: `Unable to update document with ID ${req.params.id}`,
      error: error.message,
    });
  }
};

// DELETE a document by ID
const deleteDocument = async (req, res) => {
  try {
    // Fetch the document to retrieve its file path
    const document = await knex("documents")
      .where({ id: req.params.id })
      .first();

    if (!document) {
      return res.status(404).json({
        message: `Document with ID ${req.params.id} not found`,
      });
    }

    // Delete the associated file from the disk
    if (document.filepath) {
      safelyDeleteFile(document.filepath);
    }

    // Delete the document from the database
    await knex("documents").where({ id: req.params.id }).delete();

    res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete document with ID ${req.params.id}: ${error.message}`,
    });
  }
};

// Search documents by name or tags
const searchDocuments = async (req, res) => {
  const { query } = req.query;

  try {
    const results = await knex("documents")
      .select(
        "id",
        "filename",
        "filepath",
        knex.raw("JSON_UNQUOTE(JSON_EXTRACT(tags, '$')) as tags") // Normalized tags for search
      )
      .where("filename", "like", `%${query}%`) // Matches partial filname
      .orWhereRaw("JSON_CONTAINS(tags, ?)", [`"${query}"`]); // Search for query/tag in the tags array

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: `Error searching documents: ${error.message}`,
    });
  }
};

export {
  index,
  findDocument,
  addDocument,
  deleteDocument,
  updateDocument,
  searchDocuments,
};
