// dependencies
const mongoose = require("mongoose");

// Making mongoose schema
const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    minlength: 2,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = todoSchema;
