'use strict';
// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// get all products 
const handleProducts = async (req, res) => {
    // create new mongoclient promise
    const client = new MongoClient(MONGO_URI, options);
    //specify database
    const db = client.db('groupProject');
    try {
    // connect to client
    await client.connect();
    // find all products and store them in an array
    const allProducts = await db.collection('products').find().toArray();
    if (allProducts.length === 0) {
        // if array is empty return 404
        res.status(404).json({
            status: 404,
            message: 'No products to display'
        });
    } else {
        // send response containing all products
        res.status(200).json({
            status: 200,
            data: allProducts
        });
    }} catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
    };
    // close client
    client.close();
}

// get individual product by id
const handleProductById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('groupProject');
    // convert parameter id to a number to make it match database
    const id = parseInt(req.params.id);
    try {
    await client.connect();
    const product = await db.collection('products').findOne({ _id: id});
    if (product) {
        res.status(200).json({
            status: 200,
            data: product
        });
    } else {
        res.status(404).json({
            status: 404,
            message: 'No product to display'
        });
    }} catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
    };
    client.close();
};

// const handleProductPurchase = async () => {

// }

module.exports = {
    handleProducts,
    handleProductById,
};
