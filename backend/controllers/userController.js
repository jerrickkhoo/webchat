const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

require("dotenv").config();
const SECRET = process.env.SECRET;

//register
router.post("/signup", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  try {
    const createdUser = await User.create(req.body);
    res
      .status(200)
      .json({
        message: "Account created, please log into your account.",
        data: createdUser,
      });
  } catch (error) {
    res.status(400).json({
      message:
        "Failed to create account, kindly check if the email is already registered. ",
      error: error,
    });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.status(400).json({ message: "Email And/Or Password are not valid" });
    } else {
      const result = await bcrypt.compare(password, foundUser.password);
      if (result) {
        const accessToken = jwt.sign(
          {
            id: foundUser._id,
            username: foundUser.username,
            img: foundUser.img,
          },
          SECRET
        );
        res
          .status(200)
          .json({ message: "user is loggedin", data: foundUser, accessToken });
      } else {
        res.status(400).json({
          status: "not ok",
          message: "Email And/Or Password Is Invalid",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "Fail To Log In User ",
      error: error,
    });
  }
});

//verify token
const verify = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        return res.status(400).json("Token is not valid");
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(400).json("You are not authenticated");
  }
};

//update
router.put("/:userID", verify, async (req, res) => {
  try {
    if (req.user.id === req.params.userID) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userID },
        {
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
          img: req.body.img,
        },
        { new: true }
      );

      res.status(200).json({ message: "User updated", data: updatedUser });
    } else {
      res.status(400).json("You are not allowed to update details");
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to update user details ", error: error });
  }
});

//delete
router.delete("/:userID", verify, async (req, res) => {
  try {
    if (req.user.id === req.params.userID) {
      const updatedUser = await User.findOneAndDelete({
        _id: req.params.userID,
      });
      res.status(200).json({ message: "User Deleted", data: updatedUser });
    } else {
      res.status(400).json("You are not allowed to delete");
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to delete user ", error: error });
  }
});

module.exports = router;
