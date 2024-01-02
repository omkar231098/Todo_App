const express = require("express");

const TodoRouter = express.Router();

const { HandleUrl } = require("../Controllers/todoController");

TodoRouter.use(express.json());

TodoRouter.post("/", HandleUrl);

module.exports = { TodoRouter };
