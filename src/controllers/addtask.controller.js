const Task = require("../model/task.model.js");

async function createTask(req, res) {
  const { description } = req.body;
  try {
    if (description) {
      const createTask = await Task.create({ description });
      if (createTask) {
        return res.status(200).json({ success: true, ...createTask });
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
