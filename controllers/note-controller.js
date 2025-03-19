import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Get all notes (GET) || Search and filtering
const index = async (req, res) => {
  try {
    const { title, tags } = req.query;

    let query = knex("notes");

    if (title) {
      query = query.where("title", "like", `%${title}%`);
    }

    if (tags) {
      query = query.whereRaw("JSON_CONTAINS(tags, ?)", [
        JSON.stringify(tags.split(",")),
      ]);
    }

    const notes = await query;
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes." });
  }
};

// ADD a new note (POST)

const addNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const trimmedTitle = title.trim();

    const trimmedContent = content.trim();

    const trimmedTags = Array.isArray(tags)
      ? tags.map((tag) => tag.trim()).filter(Boolean)
      : tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

    if (!trimmedTitle || !trimmedContent || trimmedTags.length === 0) {
      return res.status(400).json({ error: "All fields must me filled." });
    }

    if (!Array.isArray(tags) || tags.some((tag) => tag.trim() === "")) {
      return res
        .status(400)
        .json({ error: "Tags must be a non-empty array of string." });
    }

    const existingTitle = await knex("notes")
      .where({ title: trimmedTitle })
      .first();
    if (existingTitle) {
      return res.status(400).json({
        error: "This title already exists. Please choose a different title",
      });
    }

    const [id] = await knex("notes").insert({
      title: trimmedTitle,
      content: trimmedContent,

      tags: JSON.stringify(trimmedTags),
    });

    res.status(201).json({ id, message: "Note saved successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to save the note." });
  }
};

// Edit or Update a note by ID (PATCH)
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    // const trimmedTitle = title.trim();
    // const trimmedUrl = url.trim();
    // const trimmedDescription = description.trim();
    // const trimmedThumbnail = thumbnail.trim();

    const trimmedTitle = title ? title.trim() : "";

    const trimmedContent = content ? content.trim() : "";

    const trimmedTags = Array.isArray(tags)
      ? tags.map((tag) => tag.trim()).filter(Boolean)
      : tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

    const updatedTags = JSON.stringify(trimmedTags);

    if (!trimmedTitle || !trimmedContent || trimmedTags.length === 0) {
      return res.status(400).json({ error: "All fields must be filled." });
    }

    if (!Array.isArray(trimmedTags) || trimmedTags.length === 0) {
      return res
        .status(400)
        .json({ error: "Tags must be a non-empty array of strings." });
    }

    console.log("Updating note:", {
      id,

      trimmedTitle,
      trimmedTags,
    });

    const existingTitle = await knex("notes")
      .where({ title: trimmedTitle })
      .first();
    if (existingTitle && existingTitle.id !== Number(id)) {
      return res.status(400).json({
        error: "This title already exists. Please choose a different title",
      });
    }

    await knex("notes").where({ id }).update({
      title: trimmedTitle,
      content: trimmedContent,

      tags: updatedTags,
    });

    res.status(200).json({ message: "Note updated successfuly." });
  } catch (err) {
    console.error("Database update error:", err);
    res
      .status(500)
      .json({ error: "Failed to update the note.", details: err.message });
  }
};

// Delete a note by ID (DELETE)
const deleteNote = async (req, res) => {
  try {
    const rowsDeleted = await knex("notes")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Note with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      error: `Unable to delete note: ${err}`,
    });
  }
};

// Find a note by ID (GET)
const findNoteById = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters

    const note = await knex("notes").where({ id }).first(); // Find the link by its ID

    if (!note) {
      return res.status(404).json({ error: "Note not found." }); // If no link is found, return a 404 error
    }

    res.status(200).json(note); // Return the found link
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch note." }); // Handle any errors during the process
  }
};

export { index, addNote, updateNote, deleteNote, findNoteById };
