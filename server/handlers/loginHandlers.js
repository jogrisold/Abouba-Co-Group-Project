"use strict";

// mongodb and dotenv setup
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");

// get user by email and send the respponse to the client
const handleLogIn = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("groupProject");
  const _option = {
    projection: {
      _id: 0,
    },
  };
  let body = req.body;

  try {
    await client.connect();
    const user = await db
      .collection("users")
      .findOne({ email: body.email }, _option);

    if (user) {
      // Check if the database encrypted password matches the login
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.status(200).json({
          status: 200,
          data: user,
          message: "Success",
        });
      } else {
        res.status(404).json({
          status: 404,
          data: body.email,
          message: "Invalid Password",
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        data: req.body,
        message: "No account found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: err.message,
    });
  }
  client.close();
};

// Creates the sign in user email
const handleSignIn = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("groupProject");
  let user = null;

  try {
    await client.connect();
    user = await db.collection("users").findOne({ email: req.body.email });

    // Check if the entered email already exists in the users collection
    if (!user) {
      req.body._id = uuidv4();
      // Steps to encrypt the password
      // const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Inserts the following two empty arrays
      req.body.favorites = [];
      req.body.purchaseHistory = [];
      req.body.password = hashedPassword;
      // The new user account will be created in the database
      // The password will be stored encrypted and cannot be reverted
      const userInserted = await db.collection("users").insertOne(req.body);
      if (userInserted) {
        res.status(200).json({
          status: 200,
          data: req.body,
        });
      } else {
        res.status(404).json({
          status: 404,
          data: req.body,
          message: "The Sign in creation has failed",
        });
      }
    } else {
      res.status(200).json({
        status: 200,
        data: req.body,
        message: "That email already exists",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: err.message,
    });
  }
  client.close();
};

module.exports = {
  handleLogIn,
  handleSignIn,
};
