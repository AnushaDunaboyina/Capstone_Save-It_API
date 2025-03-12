import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Get all documents
const index = async (req, res) => {
  try {
    const data = await knex("documents"); // Fetch all documents from the database

    res.status(200).json(data); // Send the fetched documents as JSON response
  } catch (error) {
    res.status(400).send(`Error retrieving documents: ${error}`); // Send eror response if there's an issue
  }
};

// Get a single document
const findDocument = async (req, res) => {
  try {
    const document = await knex("documents").where({ id: req.params.id }); // Fetch a document with the specified ID from the database

    if (document.length === 0) {
      // Check if the document exists
      return res.status(404).json({
        message: `Document with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json(document[0]); // Send the fetched document as JSON response
  } catch (error) {
    res.status(500).json({
      // Send error response if there's an issue
      message: `Unable to retrieve document with ID ${req.params.id}`,
    });
  }
};

//  Add or POST a new document (using a middleware like 'multer' for file uploads)
const addDocument = async (req, res) => {
  try {
    const file = req.file; // Get the uploaded file from the request
    if (!file) {
      return res.status(400).send("No file uploaded");
    }

    const newDocument = {
      // Create a new document object with file details
      filename: file.originalName,
      filepath: file.path,
      tags: JSON.stringify(req.body.tags || []),
      createdAt: new Date(),
    };

    const result = await knex("documents").insert(newDocument); // Insert the new document into the database and get the inserted ID
    const newDocumentId = result[0];

    const createdDocument = await knex("documents")
      .where({ id: newDocumentId })
      .first();

    res.status(201).json(createdDocument); // Send the created document as JSON response
  } catch (error) {
    res.status(500).json({
      // Send error response if there's an issue
      message: `Unable to add new document: ${error}`,
    });
  }
};

// Delete a document by ID
const deleteDocument = async (req, res) => {
  try {
    const deleted = await knex("documents").where({ id: req.params.id }).del(); // Delete the document with the specified ID from the database

    if (!deleted) {
      // Check if the document was found and deleted
      return res.status(404).json({
        message: `Document with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      // Send success response if the document was deleted
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      // Send error response if there's an issue
      message: `Unable to delete document with ID ${req.params.id}`,
    });
  }
};
export { index, findDocument, addDocument, deleteDocument };
