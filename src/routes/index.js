const { Router } = require("express");

const createTask = require("../controllers/addtask.controller.js");
const editTask = require("../controllers/edittask.controller.js");
const deleteTask = require("../controllers/deleteTask.controller.js");
const { findTasks, findTask } = require("../controllers/findTasks.controller");
const signUp=require("../controllers/signup.controller.js")

let router = Router();

router.delete("/tasks", deleteTask);
router.get("/task", findTask);
router.get("/tasks", findTasks);
router.patch("/tasks", editTask);
router.post("/tasks", createTask);
router.post("/auth/tasks", signUp)

module.exports = router;
