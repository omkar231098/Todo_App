const { TodoModel } = require("../Model/todo.model");



const CreateTodo = async (req, res) => {

  const payload = req.body;

  try {
    const newTodo = new TodoModel(payload);
    await newTodo.save();
    res.status(200).json({success: true, msg: "New Todo Added Sucessfully" });
  } catch (err) {
    res.status(404).json({success: false, msg: "Not able to add todo list" });
  }

};

const GetTodo = async (req, res) => {

  try {
    const Todo = await TodoModel.find({});
    res.status(200).json(Todo);
  } catch (err) {
    res.status(404).json({ success: false,msg: "Not able to load todo list" });
  }

};

const DeleteTodo = async (req, res) => {

  const id = req.params.id;

  try {
    await TodoModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Todo Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }

}


const UpdateTodo = async (req, res) => {

  const { id } = req.params;
  const payload = req.body;

  try {
    const upadteTodo=    await TodoModel.findByIdAndUpdate({ _id: id }, payload);

    res.status(200).json({success:true,message:"Successfully Updated Todo",data:upadteTodo})
  } catch (error) {
    res.status(500).json({success:false,message:"Failed to update"})
  }


}

module.exports = { CreateTodo ,GetTodo, DeleteTodo, UpdateTodo};
