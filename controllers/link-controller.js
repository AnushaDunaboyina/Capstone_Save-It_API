import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import validator from "validator";

// Get all links (GET) || Search and filtering
const index = async (req, res) => {
  try {
    const { search, tags } = req.query;

    let query = knex("links");

    if (search) {
      query = query
        .where("title", "like", `%${search}%`)
        .orWhere("description", "like", `%${search}%`)
        .orWhere("thumbnail", "like", `%${search}%`)
        .orWhereRaw("JSON_CONTAINS(tags, ?)", [JSON.stringify([search])]);
    }

    if (tags) {
      query = query.whereRaw("JSON_CONTAINS(tags, ?)", [
        JSON.stringify(tags.split(",")),
      ]);
    }

    const links = await query;

    // Format the createdAt field to only include the date
    const formattedLinks = links.map((link) => ({
      ...link,
      createdAt: new Date(link.createdAt).toLocaleDateString("en-US"), // Format to MM/DD/YYYY
    }));
    res.status(200).json(formattedLinks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch links." });
  }
};

// ADD a new Link (POST)

const addLink = async (req, res) => {
  try {
    const { title, url, description, thumbnail, tags } = req.body;

    const trimmedTitle = title.trim();
    const trimmedUrl = url.trim();
    const trimmedDescription = description.trim();
    const trimmedThumbnail = thumbnail.trim();
    const trimmedTags = Array.isArray(tags)
      ? tags.map((tag) => tag.trim()).filter(Boolean)
      : tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

    if (
      !trimmedTitle ||
      !trimmedUrl ||
      !trimmedDescription ||
      !trimmedThumbnail ||
      trimmedTags.length === 0
    ) {
      return res.status(400).json({ error: "All fields must me filled." });
    }

    if (
      !validator.isURL(trimmedUrl) ||
      !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmedUrl)
    ) {
      return res.status(400).json({ error: "Invalid url format." });
    }

    if (!Array.isArray(tags) || tags.some((tag) => tag.trim() === "")) {
      return res
        .status(400)
        .json({ error: "Tags must be a non-empty array of string." });
    }

    const existingUrl = await knex("links").where({ url: trimmedUrl }).first();
    if (existingUrl) {
      return res.status(400).json({ error: "This link already exist." });
    }

    const existingTitle = await knex("links")
      .where({ title: trimmedTitle })
      .first();
    if (existingTitle) {
      return res.status(400).json({
        error: "This title already exists. Please choose a different title",
      });
    }

    const [id] = await knex("links").insert({
      url: trimmedUrl,
      title: trimmedTitle,
      description: trimmedDescription,
      thumbnail: trimmedThumbnail,
      tags: JSON.stringify(trimmedTags),
    });

    res.status(201).json({ id, message: "Link saved successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to save the link." });
  }
};

// Edit or Update a link by ID (PATCH)
const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, title, description, thumbnail, tags } = req.body;

    const trimmedTitle = title ? title.trim() : "";
    const trimmedUrl = url ? url.trim() : "";
    const trimmedDescription = description ? description.trim() : "";
    const trimmedThumbnail = thumbnail ? thumbnail.trim() : "";
    const trimmedTags = Array.isArray(tags)
      ? tags.map((tag) => tag.trim()).filter(Boolean)
      : tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

    const updatedTags = JSON.stringify(trimmedTags);

    if (
      !trimmedTitle ||
      !trimmedUrl ||
      !trimmedDescription ||
      !trimmedThumbnail ||
      trimmedTags.length === 0
    ) {
      return res.status(400).json({ error: "All fields must be filled." });
    }

    if (
      !validator.isURL(trimmedUrl) ||
      !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmedUrl)
    ) {
      return res.status(400).json({ error: "Invalid url format." });
    }

    if (!Array.isArray(trimmedTags) || trimmedTags.length === 0) {
      return res
        .status(400)
        .json({ error: "Tags must be a non-empty array of strings." });
    }

    const existingUrl = await knex("links").where({ url: trimmedUrl }).first();
    if (existingUrl && existingUrl.id !== Number(id)) {
      return res.status(400).json({ error: "This link already exist." });
    }

    const linkToUpdate = await knex("links").where({ id }).first();
    if (!linkToUpdate) {
      return res.status(400).json({ error: "Link not found" });
    }

    console.log("Updating link:", {
      id,
      trimmedUrl,
      trimmedTitle,
      trimmedTags,
    });

    const existingTitle = await knex("links")
      .where({ title: trimmedTitle })
      .first();
    if (existingTitle && existingTitle.id !== Number(id)) {
      return res.status(400).json({
        error: "This title already exists. Please choose a different title",
      });
    }

    await knex("links").where({ id }).update({
      url: trimmedUrl,
      title: trimmedTitle,
      description: trimmedDescription,
      thumbnail: trimmedThumbnail,
      tags: updatedTags,
    });

    res.status(200).json({ message: "Link updated successfuly." });
  } catch (err) {
    console.error("Database update error:", err);
    res
      .status(500)
      .json({ error: "Failed to update the link.", details: err.message });
  }
};

// Delete a link by ID (DELETE)
const deleteLink = async (req, res) => {
  try {
    const rowsDeleted = await knex("links")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Link with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      error: `Unable to delete link: ${err}`,
    });
  }
};

// Find a link by ID (GET)
const findLinkById = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters

    const link = await knex("links").where({ id }).first(); // Find the link by its ID

    if (!link) {
      return res.status(404).json({ error: "Link not found." }); // If no link is found, return a 404 error
    }

    res.status(200).json(link); // Return the found link
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch link." }); // Handle any errors during the process
  }
};

export { index, addLink, updateLink, deleteLink, findLinkById };
