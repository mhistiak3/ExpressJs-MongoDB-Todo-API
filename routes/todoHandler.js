// dependencies
const express = require("express");
const mongoose = require("mongoose");

// Application Module
const checkLogin = require("../middleware/checkLogin");
const todoSchema = require("../schema/todoSchema");

// Create Todo Model in MongoDB
const Todo = mongoose.model("Todo", todoSchema);

// Create User Routes
const routes = express.Router();

// Add Single Todo in MongoDB Database
routes.post("/", checkLogin, async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.userId,
    });
    await todo.save();
    res.status(200).json({
      message: "Todo succeefully added",
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error in server side.",
    });
  }
});

// Get All Todo From MongoDB Database
routes.get("/", checkLogin, async (req, res) => {
  try {
    const result = await Todo.find({ user: req.userId })
      .populate("user", "fullname email")
      .select({
        _v: 0,
      });
    res.status(200).json({
      result,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error in server side.",
    });
  }
});

// Update Single Todo from MongoDB Database
routes.put("/:id", checkLogin, async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Update Success",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error in server side.",
    });
  }
});

// Delete Single Todo from MongoDB Database
routes.delete("/:id", checkLogin, async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Delete Success",
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error in server side.",
    });
  }
});
module.exports = routes;
