const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/finalForm");

const app = express();
const port = 8080;

app.use(express.json());
app.use(User);

// running server on port - 8080
app.listen(port, () => {
  console.log(`Server is up and running on port : ${port}`);
});
