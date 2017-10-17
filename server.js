require('dotenv').config();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();

// Database configuration
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_CONN_STR, {
  useMongoClient: true
});

// API configuration
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Enable CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, Authorization, Origin, X-Requested-With, Content-Type, Accept');

  if(req.method === 'OPTIONS') {
      return res.status(204).send();
  }
  next();
});

// Routes
app.use('/api/v1/products', require('./modules/product/product.module'));

app.listen(PORT, function() {
  console.log(`Pothole Detector API listening on port ${PORT}`);
});
