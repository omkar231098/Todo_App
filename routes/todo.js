
const express = require("express");


const TodoRouter = express.Router();


const { authenticate } = require("../auth/verifyToken");


const { CreateTodo, GetTodo, DeleteTodo, UpdateTodo } = require("../Controllers/todoController");


TodoRouter.use(express.json());

// Define routes with associated controller methods and authentication middleware
TodoRouter.post("/add", authenticate, CreateTodo); // Create a new Todo
TodoRouter.get("/get", authenticate, GetTodo); // Get all Todos
TodoRouter.delete("/:id", authenticate, DeleteTodo); // Delete a Todo by ID
TodoRouter.patch("/:id", authenticate, UpdateTodo); // Update a Todo by ID


module.exports = { TodoRouter };
