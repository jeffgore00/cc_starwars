'use strict';
const apiRouter = require('express').Router();
const request = require('request-promise');
const { promisify } = require('util');
const path = require('path');
const readFile = promisify(require('fs').readFile);

const { SWAPI_ADDRESS } = require('../constants');
const { groomFilmData } = require('../utils');

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

apiRouter.get('/characters/:id/films', async (req, res, next) => {
  try {
    const characterData = await request(
      `${SWAPI_ADDRESS}/people/${req.params.id}`
    );
    const { films } = JSON.parse(characterData);
    const filmIds = films.map(film => {
      const secondToLastSlash = film.lastIndexOf('/', film.length - 2);
      return Number(film.slice(secondToLastSlash + 1, film.length - 1));
    });
    // handle if character is in no films
    const filmData = await fetchFilms(filmIds);
    //console.log(filmData);
    res.send(groomFilmData(filmData));
  } catch (err) {
    // log the error in server
    res.status(404).send(err);
  }
});

async function fetchFilms(filmIds) {
  const failures = [];
  const films = [];
  for (const filmId of filmIds) {
    try {
      const film = await request(`${SWAPI_ADDRESS}/films/${filmId}`);
      films.push({ ...JSON.parse(film), filmId });
    } catch (err) {
      console.log(err);
      failures.push(filmId);
    }
  }
  console.log(films.length);
  return films;
}

module.exports = apiRouter;
