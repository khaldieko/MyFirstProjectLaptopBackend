const Task = require("../model/task.model.js");

async function deleteTask(req, res) {
  const { id } = req.query;
  try {
    if (id) {
      const deleteTask = await Task.findByIdAndDelete({ _id: id });

      console.log(deleteTask);
      if (deleteTask) {
        return res.status(200).json({ success: true, ...deleteTask });
      }
      return res
        .status(400)
        .json({ success: false, message: "invalid request" });
    }
    return res.status(400).json({ success: false, message: "invalid request" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
}

module.exports = deleteTask;
