// dependencies
const express = require("express");
const mongoose = require("mongoose");

// Application Module
const userHandler = require("./routes/userHandler");
const todoHandler = require("./routes/todoHandler");

// Express App object
const app = express();

// MongoDB Dtabase Connection
mongoose
  .connect("mongodb://localhost/TodoDB")
  .then(() => console.log(`Connect Successful`))
  .catch((err) => console.log(err));


// Application Middleware
app.use(express.json());

// Routes Middleware
app.use("/user", userHandler);
app.use("/todo", todoHandler);

// Application Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "TODO APP" });
});

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next("Headers already sent");
  }
  res.status(500).json({ error: "There is an error" });
});

// Server listening on port 3000
app.listen(3000, () => {
  console.log(`Server listening: http://localhost:3000`);
});
