import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import axios from "axios";

// Get all notes (GET) || Search and filtering
const index = async (req, res) => {
  try {
    const { search, tags } = req.query;

    let query = knex("notes");

    if (search) {
      query = query
        .where("title", "like", `%${search}%`)
        .orWhereRaw("JSON_CONTAINS(tags, ?)", [JSON.stringify([search])]);
    }

    if (tags) {
      query = query.whereRaw("JSON_CONTAINS(tags, ?)", [
        JSON.stringify(tags.split(",")),
      ]);
    }

    // const notes = await query.select("id", "title", "content", "tags", "color", "createdAt"); // Include the color field
    const notes = await query;

    // Format the createdAt field to only include the date
    const formattedNotes = notes.map((note) => ({
      ...note,
      createdAt: new Date(note.createdAt).toLocaleDateString("en-US"), // Format to MM/DD/YYYY
    }));
    res.status(200).json(formattedNotes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes." });
  }
};

// ADD a new note (POST)

const addNote = async (req, res) => {
  try {
    const { title, content, tags, color } = req.body;

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const noteColor = color?.trim() || "white";
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
      color: noteColor,
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
    const { title, content, tags, color } = req.body;

    const trimmedTitle = title ? title.trim() : "";
    const trimmedContent = content ? content.trim() : "";
    const noteColor = color?.trim();
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
      color: noteColor,
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

// AI-Powered Grammar Correction or Summarization (POST)
const processWithAIUsingPrompt = async (req, res) => {
  try {
    const { content, task } = req.body;

    if (!content || !task) {
      return res.status(400).json({ error: "Content and task are required." });
    }

    // Create a simple prompt based on the task
    let prompt = "";
    if (task === "grammar_correction") {
      prompt = `Fix the grammar in the following text: "${content}"`;
    } else if (task === "summarize") {
      prompt = `Summarize the following text: "${content}"`;
    } else {
      return res.status(400).json({ error: "Invalid task type." });
    }

    // Call the AI API with the prompt
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_AI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = response.data;
    res.status(200).json({
      processedContent: response.data.candidates[0].content.parts[0].text,
    });
  } catch (error) {
    console.error("Error processing content:", error.message);
    res.status(500).json({ error: "Failed to process content." });
  }
};

export {
  index,
  addNote,
  updateNote,
  deleteNote,
  findNoteById,
  processWithAIUsingPrompt,
};
