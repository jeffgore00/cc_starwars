'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { buildErrorPayload } = '../utils';

const app = express();

//logging middleware
app.use(morgan('dev'));

//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static middleware
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(buildErrorPayload(err, 'local'));
});

module.exports = app;
