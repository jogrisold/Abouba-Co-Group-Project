'use strict';

// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// get user by id
const handleUsersById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('groupProject');
    const id = parseInt(req.params.id);
    try {
    await client.connect();
    const user = await db.collection('users').findOne({_id: id});
    if (user) {
        res.status(200).json({
            status: 200,
            data: user
        });
    } else {
        res.status(404).json({
            status: 404,
            message: 'No user to display'
        });
    }} catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
    };
    client.close();
};

module.exports = {
    handleUsersById
};
