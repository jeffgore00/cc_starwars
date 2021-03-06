'use strict';
/* DEPENDENCIES - EXTERNAL */
const router = require('express').Router();
const request = require('request-promise');
const path = require('path');

/* DEPENDENCIES - INTERNAL */
const { SWAPI_ADDRESS } = require('../constants');
import {
  errorLog,
  readFile,
  fetchFilms,
  buildErrorLog,
  buildErrorPayload,
  logErrorAndRespond
} from '../utils-server';
// // for some reason CommonJS cannot be mocked by jest ...
// const {
//   errorLog,
//   readFile,
//   fetchFilms,
//   buildErrorLog,
//   buildErrorPayload,
//   logErrorAndRespond
// } = require('../utils-server')
import { extractIDsFromAPIRoutes } from '../../utils-shared';

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
  // Larger try/catch for local server errors, nested try/catches for SWAPI
  // API calls...
  try {
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
  } catch (err) {
    next(err);
  }
});


module.exports = router;
