'use strict';
const apiRouter = require('express').Router();
const db = require('../db');
const { promisify } = require('util');
const path = require('path');
const readFile = promisify(require('fs').readFile);

apiRouter.get('/characters', async (req, res, next) => {
  try {
    const data = await readFile(
      path.join(__dirname, '../../characters.json'),
      'utf-8'
    );
    res.send(JSON.parse(data));
  } catch (err) {
    next(err);
  }
});

module.exports = apiRouter;
