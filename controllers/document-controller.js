import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = (req, res) => {
  res.status(200).send();
};

const addDocument = (req, res) => {
  res.status(201).send();
};

const deleteDocument = (req, res) => {
  res.status(200).send();
};

export { index, addDocument, deleteDocument };