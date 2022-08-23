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
  // Get a new uuid for _id and confirmation of the purchase
  const genId = uuidv4();
  // Get today's date for the purchase date
  const today = new Date();
  let purchaseTotal = 0;
  let products = [];
  let quantities = [];

  try {
    await client.connect();
    // Aggregate the products price and set it to purchaseTotal
    // Add the product id and quantity to later update the products collection
    req.body.products.forEach((product) => {
      purchaseTotal += Number(product.price.replace("$", ""));
      products.push({
        _id: parseInt(product._id),
        quantity: parseInt(product.quantity),
      });
    });

    let document = {
        _id: genId,
        confirmation: genId,
        purchaseTotal: "$" + purchaseTotal,
        datePurchased: today,
        products: [...req.body.products],
      };

    let query = { email: req.body.email };
    let newValues = { $push: { purchaseHistory: document } };
    let update = null;

    // Updates the user purchaseHistory array by adding the purchased products
    update = await db.collection("users").updateOne(query, newValues);
    const userInfo = await db.collection("users").findOne({email: req.body.email});
    console.log(userInfo)



    if (update) {
      //  loops in the purchase products array and for each productId
      //  then updates the products collection by updating the numInStock
      //  using the purchased quantity
      //  Using the data array to build query and newValues to update

      let updateProduct = null;

      await products.forEach(async (element) => {
        updateProduct = db
          .collection("products")
          .updateOne(
            { _id: element._id },
            { $inc: { numInStock: -element.quantity } }
          );
      });

      if (updateProduct) {
        res.status(200).json({ status: 200, data: document });
      } else {
        res.status(404).json({
          status: 404,
          data: document,
          message: "Invalid product. Not found",
        });
      }
    } else {
      res
        .status(404)
        .json({ status: 404, data: document, message: "Not Found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err });
  }
};
module.exports = {
  handleUsersById,
  handleUserPurchase,
};
