import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = (req, res) => {
  res.status(200).send();
};

const addLink = (req, res) => {
  res.status(201).send();
};

const deleteLink = (req, res) => {
  res.status(200).send();
};

export { index, addLink, deleteLink };