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
  let characterData;
  // Fetch character data from SWAPI first
  try {
    characterData = await request({
      uri: `${SWAPI_ADDRESS}/people/${req.params.id}`,
      json: true
    });
  } catch (err) {
    res.status(404).send(err);
  }
  // With that successful, use API routes in character data to fetch film data
  const { films } = characterData;
  const filmIds = extractIDsFromAPIRoutes(films);
  try {
    const { filmsLoaded, filmsFailedToLoad } = await fetchFilms(filmIds);
    res.send(filmsLoaded);
  } catch (err) {
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
      filmsFailedToLoad.push([filmId, err]);
    }
  }
  // If absolutely zero films loaded, that's a problem, since SWAPI is based on
  // the films. The user should know about this.
  if (!filmsLoaded.length) {
    throw new Error('No films loaded');
  } else {
    // Otherwise, one of the films may have failed, which we should know about,
    // but we don't need to nuke the user experience entirely because a subset
    // of films is missing. We will not notify the user but will write to our
    // server error log.
    return {
      filmsLoaded,
      filmsFailedToLoad
    };
  }
}

module.exports = router;
