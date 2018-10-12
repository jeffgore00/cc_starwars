'use strict';
const router = require('express').Router();
const request = require('request-promise');
const { promisify } = require('util');
const path = require('path');
const readFile = promisify(require('fs').readFile);

const { SWAPI_ADDRESS } = require('../constants');
const { groomFilmData, extractIDsFromAPIRoutes } = require('../../utils');

/* ROUTES */

router.get('/characters', async (req, res, next) => {
  try {
    const charactersJSON = await readFile(
      path.join(__dirname, '../../characters.json'),
      'utf-8'
    );
    res.send(JSON.parse(charactersJSON));
  } catch (err) {
    next(err);
  }
});

router.get('/characters/:id/films', async (req, res, next) => {
  try {
    const characterData = await request({
      uri: `${SWAPI_ADDRESS}/people/${req.params.id}`,
      json: true
    });
    const { films } = characterData;
    const filmIds = extractIDsFromAPIRoutes(films);
    const groomedFilms = await fetchFilms(filmIds);
    res.send(groomedFilms);
  } catch (err) {
    // write to server log?
    res.status(404).send(err);
  }
});

/* ROUTE HELPERS */

async function fetchFilms(filmIds) {
  const filmsFailedToLoad = [];
  const filmsLoaded = [];
  for (const filmId of filmIds) {
    try {
      const film = await request({
        uri: `${SWAPI_ADDRESS}/films/${filmId}`,
        json: true
      });
      filmsLoaded.push(groomFilmData(film, filmId));
    } catch (err) {
      filmsFailedToLoad.push(filmId);
    }
  }
  if (filmsFailedToLoad.length) {
    console.log('DO SOMETHING HERE....');
    // write to server log?
  }
  return filmsLoaded;
}

module.exports = router;
