
const { TodoModel } = require("../Model/todo.model");

// Create a new Todo
const CreateTodo = async (req, res) => {
  const payload = req.body;

  try {
    // Create and save a new Todo
    const newTodo = new TodoModel(payload);
    await newTodo.save();
    res.status(200).json({ success: true, msg: "New Todo Added Successfully" });
  } catch (err) {
    // Handle error if unable to add a new Todo
    res.status(404).json({ success: false, msg: "Not able to add todo list" });
  }
};

// Get all Todos
const GetTodo = async (req, res) => {
  try {
    // Retrieve all Todos
    const Todo = await TodoModel.find({});
    res.status(200).json(Todo);
  } catch (err) {
    // Handle error if unable to load todo list
    res.status(404).json({ success: false, msg: "Not able to load todo list" });
  }
};

// Delete a Todo by ID
const DeleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete Todo by ID
    await TodoModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Todo Successfully Deleted" });
  } catch (error) {
    // Handle error if failed to delete
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

// Update a Todo by ID
const UpdateTodo = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    // Update Todo by ID
    const updatedTodo = await TodoModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).json({ success: true, message: "Successfully Updated Todo" });
  } catch (error) {
    // Handle error if failed to update
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};


module.exports = { CreateTodo, GetTodo, DeleteTodo, UpdateTodo };
