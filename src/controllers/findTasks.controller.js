const Task = require("../model/task.model.js");
const { ValidationError, NotFound } = require("../Error/customError");

async function findTasks(req, res) {
  const { user } = req;
  try {
    let tasks = await Task.find({ user: user.id ? user.id : user._id }).exec();
    if (tasks) {
      return res.status(200).json({ status: "success", tasks }).end();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: `Invalid request` }).end();
  }
}

async function findTask(req, res) {
  const { id } = req.query;

  try {
    if (!id) {
      throw new ValidationError("Expected task id", id);
    }
    let task = await Task.findById({ id }).exec();
    if (task) {
      return res.status(200).json({ task }).end();
    }
    throw new NotFound("Could not find task document", task);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(error.status).json({
        status: "failed",
        message: `Validation error: ${error.message}, but got ${error.cause}`,
      });
      return;
    }
    if (error instanceof NotFound) {
      res.status(error.status).json({
        status: "failed",
        message: `Notfound error: ${error.message}`,
        cause: error.cause,
      });
      return;
    }
    return res.status(400).send({ message: `Invalid request` }).end();
  }
}

module.exports = { findTasks, findTask };
