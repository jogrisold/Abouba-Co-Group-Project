
// import products 
const products = require("./data/items.json")

//import companies
const companies = require("./data/companies.json")

// mongodb/dotenv setup
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// import products fx
const importItems = async () => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const db = client.db("groupProject");
        await client.connect();
        await db.collection("products").insertMany(products);
    } catch(err){
        console.log(err);
    }
    client.close();
}

importItems();

// import companies fx
const importCompanies = async () => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const db = client.db("groupProject");
        await client.connect();
        await db.collection("companies").insertMany(companies);
    } catch(err) {
        console.log(err);
    }
    client.close();
}

importCompanies();