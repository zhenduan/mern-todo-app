const Todo = require("../models/Todo.js");

// Controller methods for CRUD operations
exports.createTodo = async (req, res) => {
  try {
    const newTask = await Todo.create(req.body);
    res.status(201).json({ newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    const updatedItem = await Todo.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    } else {
      res.json("updated");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
