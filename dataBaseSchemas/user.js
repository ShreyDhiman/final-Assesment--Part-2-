const mongoose = require("mongoose");
const validator = require("validator");

// schema creation for user

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
    trim: true,
  },
  Email: {
    type: String,
    index: { unique: true },
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter a valid email");
      }
    },
  },
  Phone: {
    type: Number,
    required: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "Password"');
      }
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User: User };
