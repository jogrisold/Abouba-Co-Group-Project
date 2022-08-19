'use strict';

// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// get all companies
const handleCompanies = async (req, res) => {
    // create new mongoclient promise
    const client = new MongoClient(MONGO_URI, options);
    //specify database
    const db = client.db('groupProject');
    try {
    // connect to client
    await client.connect();
    // find all companies and store them in an array
    const allCompanies = await db.collection('companies').find().toArray();
    if (allCompanies.length === 0) {
        // if array is empty return 404
        res.status(404).json({
            status: 404,
            message: 'No companies to display'
        });
    } else {
        // send response containing all companies
        res.status(200).json({
            status: 200,
            data: allCompanies
        });
    };
    } catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
    };
    // close client
    client.close();
};

// get individual company by id
const handleCompaniesById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('groupProject');
    // convert parameter id to a number to make it match database
    const id = parseInt(req.params.id);
    try {
        await client.connect();
        const company = await db.collection('companies').findOne({_id: id});
        if (company) {
            res.status(200).json({
                status: 200,
                data: company
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'No company to display'
            });
        };
    } catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
    };
    client.close();
};


module.exports = {
    handleCompanies,
    handleCompaniesById
};