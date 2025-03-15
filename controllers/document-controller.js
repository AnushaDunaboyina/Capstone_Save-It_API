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

// GET a single document
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

// POST or ADD a new document (using a middleware like 'multer' for file uploads)
const addDocument = async (req, res) => {
  console.log("Add document");
  console.log("Uploaded File:", req.file);
  console.log("Request Body:", req.body);
  // console.log(req.file); // This will help you debug the uploaded file
  try {
    const file = req.file; // Get the uploaded file from the request
    const { filename, tags } = req.body;

    if (!filename || filename.trim() === "") {
      return res.status(400).json({ message: "Filename cannot be empty. Please provide valid name."})
    }

    if (!file) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (!tags, tags.trim() === "") {
      return res.status(400).json({
        message: "Tags cannot be empty or contain spaces. Please provide valid tags."
      })
    }

    // Check if the filename already exists
    const existingFilename = await knex("documents")
      .where({ filename })
      .first();
    if (existingFilename) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        }
      });
      return res.status(400).json({
        message: `A document with the filename "${filename}" already exists. Please choose a different name.`,
      });
    }

    // Ensure tags is an array
    let tagsArray;
    try {
      tagsArray = JSON.parse(tags); // Parse tags if it's a JSON string
      console.log("Parsed Tags Array:", tagsArray);
    } catch (error) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        }
      });
      return res
        .status(400)
        .json({ message: "Tags must be a valid JSON array" });
    }
    if (!Array.isArray(tagsArray)) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        }
      });
      return res.status(400).json({ message: "Tags must be an array" });
    }

    // Create a new document object with file details
    const newDocument = {
      filename,
      filepath: file.path,
      tags: JSON.stringify(tagsArray), // Store tags as an array
      createdAt: new Date(),
    };

    console.log("New Document Object:", newDocument);

    const result = await knex("documents").insert(newDocument); // Insert the new document into the database and get the inserted ID
    console.log("Insert Result:", result);
    const newDocumentId = result[0];

    // Retrieve and send the created document
    const createdDocument = await knex("documents")
      .where({ id: newDocumentId })
      .first();

    res
      .status(201)
      .json({ message: "File uploaded successfully", createdDocument }); // Send the created document as JSON response
  } catch (error) {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Failed to delete file:", err);
      }
    });
    res.status(500).json({
      message: "Unable to add new document:",
      error: error.message, // Send error response if there's an issue
    });
    console.error("Error in addDocument:", error);
  }
};

// Edit /Update a document by ID (PATCH)
const updateDocument = async (req, res) => {
  try {
    const { filename, tags } = req.body;

    if (!filename || !tags) {
      return res
        .status(400)
        .json({ message: "Filename and tags are required" });
    }

    // Ensure tags is an array
    let tagsArray;
    try {
      tagsArray = JSON.parse(tags); // Parse tags if it's a JSON string
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Tags must be a valid JSON array" });
    }

    if (!Array.isArray(tagsArray)) {
      return res.status(400).json({ message: "Tags must be an array" });
    }

    const fieldsUpdated = await knex("documents") // Update the document with the specified ID using the provided fields
      .where({ id: req.params.id })
      .update(req.body);

    // Check if the document was found and updated
    if (fieldsUpdated === 0) {
      return res.status(404).json({
        message: `Document with ID ${req.params.id} not found or no changes made`,
      });
    }

    const updatedDocument = await knex("documents") // Fetch the updated document from the database
      .where({
        id: req.params.id,
      })
      .first(); // use first to return updated document directly

    res.status(200).json(updatedDocument); // Send the updated document as JSON response
  } catch (error) {
    res.status(500).json({
      message: `Unable to update document with ID ${req.params.id}: ${error}`, // Send error response if there's an issue
    });
  }
};

// DELETE a document by ID
const deleteDocument = async (req, res) => {
  try {
    const deleted = await knex("documents")
      .where({ id: req.params.id })
      .delete(); // Delete the document with the specified ID from the database

    if (deleted === 0) {
      return res.status(404).json({
        message: `Document with ID ${req.params.id} not found`, // Check if the document was found and deleted
      });
    }

    res.status(200).json({
      message: "Document deleted successfully", // Send success response if the document was deleted
    });
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete document with ID ${req.params.id}`, // Send error response if there's an issue
    });
  }
};
export { index, findDocument, addDocument, deleteDocument, updateDocument };
