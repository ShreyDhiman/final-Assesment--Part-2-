const express = require("express");
const { User } = require("../dataBaseSchemas/user");
const router = new express.Router();

// API For home page

router.get("/", (req, res) => {
  res.send("welcome to the login page");
});

// FOR signup

router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

// for login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
      req.send("Please enter valid credentials.");
    } else {
      const user = await User.findOne({ Password: req.body.Password });
      if (!user) {
        res.send("Please enter valid credentials");
      } else {
        res.send({ user });
      }
    }
  } catch (e) {
    res.status(400);
  }
});

// to delete

router.delete("/delete", async (req, res) => {
  try {
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
      res.send("please enter a valid cred");
    } else {
      const user = User.findOne({ Password: req.body.Password });
      if (!user) {
        res.send("Please enter valid cred");
      } else {
        await user.deleteOne();
        res.send("Used Deleted Successfully");
      }
    }
  } catch (e) {
    res.status(400);
  }
});

// API for update
router.patch("/update", async (req, res) => {
  try {
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
      res.send("Please enter valid Cred");
    } else {
      const user = User.findOne({ Password: req.body.Password });
      if (!user) {
        res.send("Please enter valid cred");
      } else {
        await user.updateOne({ Phone: req.body.Phone });
        res.send("User details updated");
      }
    }
  } catch (e) {
    res.status(400);
  }
});

module.exports = router;
