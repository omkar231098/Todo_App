const getLogger = require('../Logger/logger'); // Update the path based on your actual file structure
const logger = getLogger('auth'); // Provide the route name, e.g., 'auth' for authentication routes
const { TodoModel } = require('../Model/todo.model');
const { UserModel } = require('../Model/user.model');



// Create a new Todo
const CreateTodo = async (req, res) => {
  const { title, description } = req.body;
  const userID = req.userId;

  try {
    // Create and save a new Todo associated with the user
    const newTodo = new TodoModel({
      title,
      description,
      user: userID,
    });

    await newTodo.save();

    // Update the user's todos array with the new todo
    await UserModel.findByIdAndUpdate(userID, { $push: { todos: newTodo._id } });

    res.status(200).json({ success: true, message: 'Todo created successfully.' });
  } catch (err) {
    // Handle error if unable to add a new Todo
    logger.error(`Failed to add new Todo: ${err}`);
    res.status(404).json({ success: false, message: 'Failed to add new Todo.' });
  }
};

// Get all Todos
const GetTodo = async (req, res) => {
  try {
    // Retrieve all Todos
    const todos = await TodoModel.find({});
    res.status(200).json(todos);
  } catch (err) {
    // Handle error if unable to load Todo list
    logger.error(`Failed to load Todo list: ${err}`);
    res.status(404).json({ success: false, message: 'Failed to load Todo list.' });
  }
};

// Delete a Todo by ID
const DeleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete Todo by ID
    await TodoModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Todo deleted successfully.' });
  } catch (error) {
    // Handle error if failed to delete
    logger.error(`Failed to delete Todo: ${error}`);
    res.status(500).json({ success: false, message: 'Failed to delete Todo.' });
  }
};

// Update a Todo by ID
const UpdateTodo = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    // Update Todo by ID
    const updatedTodo = await TodoModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).json({ success: true, message: 'Todo updated successfully.' });
  } catch (error) {
    // Handle error if failed to update
    logger.error(`Failed to update Todo: ${error}`);
    res.status(500).json({ success: false, message: 'Failed to update Todo.' });
  }
};

module.exports = { CreateTodo, GetTodo, DeleteTodo, UpdateTodo };
