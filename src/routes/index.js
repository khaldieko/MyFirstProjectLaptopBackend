const { Router } = require("express");
const auth = require("../middlewares/auth.js");
const createTask = require("../controllers/addtask.controller.js");
const editTask = require("../controllers/edittask.controller.js");
const deleteTask = require("../controllers/deleteTask.controller.js");
const { findTasks, findTask } = require("../controllers/findTasks.controller");
const signUp = require("../controllers/signup.controller.js");
const login = require("../controllers/signin.controller.js");

let router = Router();

router.delete("/tasks", auth, deleteTask);
router.get("/task", auth, findTask);
router.get("/tasks", auth, findTasks);
router.patch("/tasks", auth, editTask);
router.post("/tasks", auth, createTask);
router.post("/auth/signup", auth, signUp);
router.post("/auth/login", auth, login);

module.exports = router;
