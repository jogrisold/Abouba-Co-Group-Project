"use strict";

// mongodb and dotenv setup
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// get user by id
const handleUsersById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("groupProject");
  const id = parseInt(req.params.id);
  try {
    await client.connect();
    const user = await db.collection("users").findOne({ _id: id });
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "No user to display",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
  client.close();
};

const handleUserPurchase = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("groupProject");

  //   let newValues = {$push:{"$purchaseHistory"}}
  //   {$push: {"purchaseHistory"purchaseHistory.$[].products":req.body.products}}
  try {
    await client.connect();

    let query = { email: req.body.email };

    let newValues = { $set: { purchaseHistory: req.body.purchase } };

    //  const user = await db.collection("users").updateOne(query, newValues);
    //  loops in the purchase products array and for each productId
    //  then updates the products collection by updating the numInStock
    //  using the purchased quantity

    query = {};

    data = await req.body.purchase.products.map((item) => {
      return { productId: item.productId, NumInStock: item.quantity };
    });
    //  Using the data array to build query and newValues to update
    //  user = await db.collection("products").updateOne(query, newValues);
  } catch (err) {}
};
module.exports = {
  handleUsersById,
  handleUserPurchase,
};
