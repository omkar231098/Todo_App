const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({

   title: { type: String, required: true },
   description: { type: String ,required: true},
   completed: { type: Boolean, default: false },
   createdAt: { type: Date, default: Date.now },
   user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
});

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = { TodoModel };
