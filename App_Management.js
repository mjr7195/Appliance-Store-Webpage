// App_Management.js
// Handles MongoDB Inserts for Users, Shoppers, Products, and Orders
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb://team8:team8@localhost:27017';
const dbName = 'team8DB';

// Helper function to handle inserts to avoid repeating code
async function insertDocument(collectionName, data, res) {
    console.log(`Received POST for ${collectionName}...`);
    let client;
    try {
        client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection(collectionName).insertOne(data);
        console.log(`${collectionName} Inserted:`, result.insertedId);
        res.send({ status: 'success', insertedId: result.insertedId });
    } catch (err) {
        console.error(`❌ ${collectionName} Error:`, err);
        res.status(500).send({ status: 'error', message: err.message });
    } finally {
        if (client) await client.close();
    }
}

// POST /api/users (Sign Up)
router.post('/api/users', (req, res) => insertDocument('users', req.body, res));

// POST /api/shoppers (Shopper Management)
router.post('/api/shoppers', (req, res) => insertDocument('shoppers', req.body, res));

// POST /api/products (Product Management)
router.post('/api/products', (req, res) => insertDocument('products', req.body, res));

// POST /api/orders (Shipping/Checkout)
router.post('/api/orders', (req, res) => insertDocument('orders', req.body, res));

module.exports = router;