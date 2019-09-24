'use strict';

const express = require('express');
const logger = require('./middleware/logger');
const colorLogger = require('./middleware/color-logger');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(logger);

app.use(express.json());

let db = [];

// Route to Get All Categories
app.get('/', (req, res, next) => {
  res.send('We\'re here! We\'re here everybody! We are here. We are here. We are here.');
})

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

// Don't listen if imported into tests
if (!module.parent) {
  let PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  }
};
