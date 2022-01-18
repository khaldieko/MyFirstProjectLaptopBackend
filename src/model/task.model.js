const mongoose = require("mongoose");
const User = require("./user.model");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    
  },
});
const Task = mongoose.model("tasks", TaskSchema);

module.exports = Task;
