import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import validator from "validator";

// Get all links || Search and filtering
const index = async (req, res) => {
  try {
    const { search, tags } = req.query;

    let query = knex("links");

    if (search) {
      query = query
        .where("title", "like", `%${search}%`)
        .orWhere("description", "like", `%${search}%`)
        .orWhere("thumbnail", "like", `%${search}%`);
    }

    if (tags) {
      query = query.whereRaw("JSON_CONTAINS(tags, ?)", [
        JSON.stringify(tags.split(",")),
      ]);
    }

    const links = await query;
    res.status(200).json(links);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch links." });
  }
};

// Post or Add new Link

const addLink = async (req, res) => {
  try {
    const { title, url, description, thumbnail, tags } = req.body;

    const trimmedTitle = title.trim();
    const trimmedUrl = url.trim();
    const trimmedDescription = description.trim();
    const trimmedThumbnail = thumbnail.trim();
    const trimmedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (
      !trimmedTitle ||
      !trimmedUrl ||
      !trimmedDescription ||
      !trimmedThumbnail | !trimmedTags
    ) {
      return res.status(400).json({ error: "All fields must me filled." });
    }

    if (!validator.isURL(trimmedUrl)) {
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

// Edit / Patch Link
const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, title, description, thumbnail, tags } = req.body;

    const trimmedTitle = title.trim();
    const trimmedUrl = url.trim();
    const trimmedDescription = description.trim();
    const trimmedThumbnail = thumbnail.trim();
    const trimmedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (
      !trimmedTitle ||
      !trimmedUrl ||
      !trimmedDescription ||
      !trimmedThumbnail | !trimmedTags
    ) {
      return res.status(400).json({ error: "All fields must me filled." });
    }

    if (!validator.isURL(trimmedUrl)) {
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

    const linkToUpdate = await knex("links").where({ id }).first();
    if (!linkToUpdate) {
      return res.status(400).json({ error: "Link not found" });
    }

    const existingTitle = await knex("links")
      .where({ title: trimmedTitle })
      .first();
    if (existingTitle) {
      return res.status(400).json({
        error: "This title already exists. Please choose a different title",
      });
    }

    const fieldsUpdated = await knex("links")
      .where({ id })
      .update({
        url: trimmedUrl,
        title: trimmedTitle,
        description: trimmedDescription,
        thumbnail: trimmedThumbnail,
        tags: JSON.stringify(trimmedTags),
      });

      res.status(200).json({ message: "Link updated successfuly."})
  } catch (err) {
    res.status(500).json({ Error: "Failed to update the link."})
  }
};

const deleteLink = (req, res) => {
  res.status(200).send();
};

export { index, addLink, deleteLink };
