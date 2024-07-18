// dependencies
const mongoose = require("mongoose")

// Making mongoose schema
const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password:{
    type:String,
    required:true,
    minlength:6
  }
});

module.exports = userSchema