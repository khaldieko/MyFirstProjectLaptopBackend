const Task = require("../model/task.model.js");
const { ValidationError } = require("../Error/customError");

async function editTask(req, res) {
  const { description } = req.body;
  const { id } = req.query;
  try {
    if (!id || !description) {
      throw new ValidationError(
        "Expected description and task id",
        !id ? id : description
      );
    }
    if (description) {
      const edittask = await Task.findOneAndUpdate(
        { _id: id },
        { description },
        { new: true }
      ).exec();

      if (editTask) {
        return res.status(200).json({ data: edittask });
      }
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(error.status).json({
        status: "failed",
        message: `Validation error: ${error.message}, but got ${error.cause}`,
      });
      return;
    }
    return res.status(500).json({ message: "internal server error" });
  }
}

module.exports = editTask;
