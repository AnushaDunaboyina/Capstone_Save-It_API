import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (req, res) => {
  try {
    const search = req.query.search;
    const tags = req.query.tags;

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

const addLink = (req, res) => {
  res.status(201).send();
};

const deleteLink = (req, res) => {
  res.status(200).send();
};

export { index, addLink, deleteLink };
