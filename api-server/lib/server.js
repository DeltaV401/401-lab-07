'use strict';

const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(logger);

app.use(express.json());

let db = [];

// Route to Get All Categories
app.get('/', (req, res, next) => {
  res.send('We\'re here! We\'re here everybody! We are here. We are here. We are here.');
});

app.get('/500', () => {
  throw new Error('internal server error');
});

app.get('/categories', (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
});

// Route to Create a Category
app.post('/categories', (req, res, next) => {
  let record = req.body;
  record.id = Math.random();
  db.push(record);
  res.json(record);
});

let validator = () => {
  let validity = req.valid;
  if(Math.random() >= .5){
    validity = true;
  } else {
    validity = false;
  }
  return validity;
};

// Route to get random validity
app.post('/categories', (req, res, next) => {
  let record = req.body;
  record.id = Math.random();
  if(validator() === true) {
    db.push(record);
    res.json(record);
  } else {
    throw new Error('internal server error');
  }
});

app.use(errorHandler);

// Don't listen if imported into tests
if (!module.parent) {
  let PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  },
};
