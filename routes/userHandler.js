// dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");

// Application Module
const userSchema = require("../schema/userSchema");


// Create User Model in MongoDB
const User = new mongoose.model("User", userSchema);

// Create User Routes
const routes = express.Router();

// Singup Route for create user account
routes.post("/singup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPassword,
    });
    await user.save();
    res.status(200).json({
      message: "Singup Success",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Singup Failed",
    });
  }
});

// Login Route for user Authentication
routes.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "5h",
          }
        );
        // req.userId = user[0]._id;
        // req.email = user[0].email;
        res.status(200).json({
          access_token: token,
        });
      } else {
        res.status(401).json({
          message: "Authentication Failed",
        });
      }
    } else {
      res.status(401).json({
        message: "Authentication Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Authentication Failed",
    });
  }
});

module.exports = routes;
