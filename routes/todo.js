const express = require("express");

const TodoRouter = express.Router();
const { authenticate } = require("../auth/verifyToken");

const { CreateTodo } = require("../Controllers/todoController");
const { GetTodo} = require("../Controllers/todoController");
const { DeleteTodo } = require("../Controllers/todoController");
const { UpdateTodo } = require("../Controllers/todoController");

TodoRouter.use(express.json());

TodoRouter.post("/",authenticate, CreateTodo);
TodoRouter.get("/",authenticate, GetTodo );
TodoRouter.delete("/:id", authenticate,  DeleteTodo);
TodoRouter.patch("/:id", authenticate, UpdateTodo);

module.exports = { TodoRouter };
