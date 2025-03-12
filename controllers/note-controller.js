import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = (req, res) => {
  res.status(200).send();
};

const addNote = (req, res) => {
  res.status(201).send();
};

const updateNote = (req, res) => {
  res.status(200).send();
};

const deleteNote = (req, res) => {
  res.status(200).send();
};

export { index, addNote, updateNote, deleteNote };
