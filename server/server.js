"use strict";
// use strict expressions makes code run in strict mode - helps catch silent errors
// more info here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// and here: https://www.w3schools.com/js/js_strict.asp

// import node modules

const express = require("express");
const morgan = require("morgan");

// import handlers

const {
  handleProducts,
  handleProductById,
} = require("./handlers/productHandlers");

const {
  handleCompanies,
  handleCompaniesById,
} = require("./handlers/companiesHandlers");

const {
  handleUsersById,
  handleUserPurchase,
} = require("./handlers/usersHandlers");

// Added the handleSignin and handleLogin
const { handleLogIn, handleSignIn } = require("./handlers/loginHandlers");

// call express, and then chain endpoints
express()
  // gives us more info logged into the console
  .use(morgan("tiny"))
  .use(express.json())

  // helps with file pathing, looks for files relative to the static directory (in this case the public folder)
  // this defines that file paths are coming from our directory, and not server-generated
  // more info here: https://stackoverflow.com/questions/28918845/what-exactly-does-serving-static-files-mean
  .use(express.static("public"))

  /* PRODUCT ENDPOINTS */
  // get all products
  .get("/api/products", handleProducts)
  // get products by id
  .get("/api/products/:id", handleProductById)
  // get products by category
  // patch product stock - unfinished
  // .patch('/api/products/:id', handleProductPurchase)

  /* COMPANY ENDPOINTS */
  // get all companies
  .get("/api/companies", handleCompanies)
  // get company by id
  .get("/api/companies/:id", handleCompaniesById)

  /* USER ENDPOINTS note: none of these work right now as users collection is empty*/
  // get user by id
  .get("/api/users/:id", handleUsersById)
  // Load the purchase in the user purchase history
  // Than update "products" collecion numInStock
  .patch("/api/users/:id", handleUserPurchase)

  // Get user login informations
  .post("/api/login", handleLogIn)
  // Creates new user
  .post("/api/users", handleSignIn)

  /* CATCH ALL ENDPOINT */
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "Error retrieving data",
    });
  })

  // spins up the server and listens on port 4000
  .listen(4000, () => console.log(`Listening on port 4000`));
