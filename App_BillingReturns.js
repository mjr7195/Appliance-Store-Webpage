// Handles MongoDB Inserts for Billing and Returns
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'team08DB';

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// POST /api/billing
router.post('/api/billing', async (req, res) => {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('billing').insertOne(req.body);
    res.send({ status: 'success', insertedId: result.insertedId });
    await client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: 'error', message: err.message });
  }
});

// POST /api/returns
router.post('/api/returns', async (req, res) => {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('returns').insertOne(req.body);
    res.send({ status: 'success', insertedId: result.insertedId });
    await client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: 'error', message: err.message });
  }
});

module.exports = router;