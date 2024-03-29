/* eslint-disable import/no-extraneous-dependencies */

if (process.env.NODE_ENv !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv/config');
}

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const apiV1 = require('./api/index.v1');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:8080/' }));

// api
app.use('/api/v1', apiV1);

// 404 page handler
app.use((request, response, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(error.status || 5000);
  response.json({
    message: error.message,
    stack: error.stack,
  });
});

module.exports = app;
