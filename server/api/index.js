'use strict';
/* DEPENDENCIES - EXTERNAL */
const router = require('express').Router();
const request = require('request-promise');
const { promisify } = require('util');
const path = require('path');
const readFile = promisify(require('fs').readFile);

/* DEPENDENCIES - INTERNAL */
const { SWAPI_ADDRESS } = require('../constants');
const {
  errorLog,
  groomFilmData,
  buildErrorLog,
  buildErrorPayload,
  logErrorAndRespond
} = require('../utils-server');
const { extractIDsFromAPIRoutes } = require('../../utils-shared');

/* ROUTES */
router.get('/characters', async (req, res, next) => {
  try {
    const charactersJSON = await readFile(
      path.join(__dirname, '../../characters.json'),
      'utf-8'
    );
    const { characters } = JSON.parse(charactersJSON);
    res.send(characters);
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
    logErrorAndRespond(err, res, errorLog, 'SWAPI', 'blocker');
    return;
  }
  // If the above request is successful, use film routes contained in character
  // data payload to fetch film data.
  const { films } = characterData;
  const filmIds = extractIDsFromAPIRoutes(films);
  try {
    const { filmsLoaded, filmsFailedToLoad } = await fetchFilms(filmIds);
    res.send(filmsLoaded);
    if (filmsFailedToLoad.length) {
      for (const film of filmsFailedToLoad) {
        errorLog.write(
          buildErrorLog(buildErrorPayload(film, 'SWAPI', 'minor'))
        );
      }
    }
  } catch (err) {
    logErrorAndRespond(err, res, errorLog, 'SWAPI', 'blocker');
  }
});

/* ROUTE HELPERS */
async function fetchFilms(filmIds) {
  const filmsFailedToLoad = [];
  const filmsLoaded = [];
  for (const filmId of filmIds) {
    let film;
    try {
      film = await request({
        uri: `${SWAPI_ADDRESS}/films/${filmId}`,
        json: true
      });
    } catch (err) {
      filmsFailedToLoad.push(err);
    }
    filmsLoaded.push(groomFilmData(film, filmId));
  }
  // If absolutely zero films loaded, that's a problem, since SWAPI is based on
  // the films. This should be a blocking error; the user should be able to see
  // an empty films page.
  if (!filmsLoaded.length) {
    throw new Error('No films loaded!');
  } else {
    // Otherwise, one or more of the films may have failed, which we should know about,
    // but we don't need to nuke the user experience entirely because a subset
    // of films is missing. We will still note the error in our server error log.
    return {
      filmsLoaded,
      filmsFailedToLoad
    };
  }
}

module.exports = router;
