import initKnex from "knex";
import configuration from "../knexfile.js";
import fs from "fs";
import path from "path";
import {
  parseAndValidateTags,
  safelyDeleteFile,
} from "../helpers/tagHelper.js";

const knex = initKnex(configuration);

// Get all documents
const index = async (req, res) => {
  try {
    const data = await knex("documents"); // Fetch all documents from the database

    res.status(200).json(data); // Send the fetched documents as JSON response
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
      console.log(`Temporary file deleted: ${file.path}`);
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
      console.log(`Temporary file deleted: ${file.path}`);
      return res.status(400).json({ message: error.message });
    }

    // Sanitize the filename
    const sanitizedFilename = filename.trim().replace(/\s+/g, "_");
    const fileExtension = path.extname(file.originalname);

    // Define the new path
    const publicUrl = `/uploads-documents/${sanitizedFilename}${fileExtension}`;
    const newPath = path.join(
      "C:",
      "Users",
      "vikas",
      "OneDrive",
      "Desktop",
      "uploads-documents",
      `${sanitizedFilename}${fileExtension}`
    );

    // Check for filename conflict and inform the user
    if (fs.existsSync(newPath)) {
      console.log(
        `File with the name "${sanitizedFilename}${fileExtension}" already exists.`
      );

      safelyDeleteFile(file.path); // Deletes the temporary file to save memory
      console.log(`Temporary file deleted: ${file.path}`); // Logs the deletion

      return res.status(400).json({
        message: `A file named "${sanitizedFilename}${fileExtension}" already exists. Please use a different filename.`,
      });
    }

    // Rename the file
    fs.renameSync(file.path, newPath);
    console.log("File renamed successfully.");

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

    if (!tags || tags.trim() === "") {
      return res.status(400).json({ message: "Tags are required." });
    }

    // Parse and validate tags using tagHelper.js
    let tagsArray;
    try {
      tagsArray = parseAndValidateTags(tags); // Use the helper function
    } catch (error) {
      return res.status(400).json({ message: error.message }); // Return any validation errors
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
      console.log(
        `Deleted file associated with document: ${document.filepath}`
      );
    }

    // Delete the document from the database
    await knex("documents").where({ id: req.params.id }).delete();
    console.log(`Document with ID ${req.params.id} successfully deleted.`);

    res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete document with ID ${req.params.id}: ${error.message}`,
    });
  }
};
export { index, findDocument, addDocument, deleteDocument, updateDocument };
