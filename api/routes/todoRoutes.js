const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// CRUD routes
router.post("/todos", todoController.createTodo);
router.get("/todos", todoController.getTodos);
router.get("/todos/:id", todoController.getTodoById);
router.put("/todos/:id", todoController.updateTodo);
router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
