// Handles MongoDB Inserts for Billing and Returns
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb://team8:team8@localhost:27017';
const dbName = 'team8DB';

// POST /api/billing
router.post('/api/billing', async (req, res) => {
  console.log("Received Billing POST request...");
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('billing').insertOne(req.body);
    console.log("Billing Inserted:", result.insertedId);
    res.send({ status: 'success', insertedId: result.insertedId });
    await client.close();
  } catch (err) {
    console.error("❌ Billing Error:", err);
    res.status(500).send({ status: 'error', message: err.message });
  }
});

// POST /api/returns
router.post('/api/returns', async (req, res) => {
  console.log("Received Returns POST request...");
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('returns').insertOne(req.body);
    console.log("Return Inserted:", result.insertedId);
    res.send({ status: 'success', insertedId: result.insertedId });
    await client.close();
  } catch (err) {
    console.error("❌ Returns Error:", err);
    res.status(500).send({ status: 'error', message: err.message });
  }
});

module.exports = router;