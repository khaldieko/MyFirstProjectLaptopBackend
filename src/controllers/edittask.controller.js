const Task = require("../model/task.model.js");

async function editTask(req, res) {
  const { description } = req.body;
  const { id } = req.query;
  try {
    if (description) {
      const edittask = await Task.findOneAndUpdate(
        { _id: id },
        { description },
        { new: true }
      ).exec();

      if (editTask) {
        return res.status(200).json({ data: edittask });
      }
      return res.status(400).json({ message: "invalid request" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

module.exports = editTask;
