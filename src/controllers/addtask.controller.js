const Task = require("../model/task.model.js");
const { ValidationError } = require("../Error/customError");

async function createTask(req, res) {
  const { description, user } = req.body;

  try {
    if (description) {
      const createTask = await Task.create({ description, user });

      if (createTask) {
        return res
          .status(200)
          .json({ status: "success", message: "created task successfully" });
      }
    }
    throw new ValidationError("Expected task description", description);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(error.status).json({
        status: "failed",
        message: `Validation error: ${error.message}, but got ${error.cause}`,
      });
      return;
    }
    return res.status(500).json({
      status: "failed",
      message: "Your request cannot be completed at the moment",
    });
  }
}

module.exports = createTask;
