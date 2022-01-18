const Task = require("../model/task.model.js");
const { ValidationError } = require("../Error/customError");

async function deleteTask(req, res) {
  const { id } = req.query;
  try {
    if (!id) {
      throw new ValidationError("Expected task id", id);
    }

    if (id) {
      const deleteTask = await Task.findByIdAndDelete({ _id: id });

      if (deleteTask.n > 0) {
        return res.status(200).json({
          success: true,
          message: `deleted task with the id of ${id}`,
        });
      }
      return res
        .status(400)
        .json({ success: false, message: "invalid request" });
    }
    return res.status(400).json({ success: false, message: "invalid request" });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(error.status).json({
        status: "failed",
        message: `Validation error: ${error.message}, but got ${error.cause}`,
      });
      return;
    }
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
}

module.exports = deleteTask;
