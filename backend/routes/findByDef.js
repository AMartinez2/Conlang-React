const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const secretRoute = require('./../../_secret');
const corsOptions = require('./../corsOptions');
const cors = require('cors');

const router = express.Router();

router.get('/:definition', cors(corsOptions), function(req, res, next) {
// router.get('/:definition', function(req, res, next) {
  const CONNECTION_URL = secretRoute;
  const DATABASE_NAME = 'drevtam';
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection('dictionary');
    collection.find(
      { definition: new RegExp(req.params['definition']) }
    ).toArray((error, result) => {
      if(error) {
        throw error;
      }
      res.json(result);
    });
  });
});

module.exports = router;
