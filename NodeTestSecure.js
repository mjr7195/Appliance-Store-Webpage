// Team 8 - Appliance World Secure Server
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3008;

// SSL certificates
const options = {
  key: fs.readFileSync('/data/ist256.key'),
  cert: fs.readFileSync('/data/ist256.cert'),
};

// Middleware
app.use(bodyParser.json());

// Serve static files (HTML/CSS/Images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Import billing and returns routes
const billingRoutes = require('./App_BillingReturns');
app.use(billingRoutes);

// Default route (optional test)
app.get('/hello', (req, res) => {
  res.send('Hello from Appliance World Team 8!');
});

// Start HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`✅ Appliance World server running at https://ist256.up.ist.psu.edu:${port}`);
});