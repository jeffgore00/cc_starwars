const { promisify } = require('util');
const readFile = promisify(require('fs').readFile);
const request = require('request-promise');
const { SWAPI_ADDRESS } = require('./constants');

const errorLog = require('fs').createWriteStream('errors.log', { flags: 'a' });

function logErrorAndRespond(err, res, log, source, severity) {
  const customError = buildErrorPayload(err, source, severity);
  log.write(buildErrorLog(customError));
  res.status(err.statusCode || 500).send(customError);
}

function buildErrorPayload(err, source, severity) {
  return {
    source,
    request: err.options && err.options.uri ? err.options.uri : null,
    statusCode: err.statusCode,
    severity,
    message: err.message,
    fullError: err
  };
}

function buildErrorLog(error) {
  return `${new Date()}
----------------------------------------------
  source: ${error.source}
  request: ${error.request}
  status code: ${error.statusCode}
  severity: ${error.severity}
  message: ${error.message}
  full error: ${JSON.stringify(error.fullError)}

`;
}

function groomFilmData(rawFilm, id) {
  return {
    id,
    title: rawFilm.title,
    date: rawFilm.release_date,
    desc: rawFilm.opening_crawl
      ? rawFilm.opening_crawl.replace('\r\n', ' ')
      : null,
    episodeId: rawFilm.episode_id
  };
}

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
      filmsLoaded.push(groomFilmData(film, filmId));
    } catch (err) {
      filmsFailedToLoad.push(err);
    }
  }
  // If absolutely zero films loaded, that's a problem, since SWAPI is based on
  // the films. This should be a blocking error; the user should not be able to see
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

module.exports = {
  errorLog,
  readFile,
  logErrorAndRespond,
  buildErrorPayload,
  buildErrorLog,
  groomFilmData,
  fetchFilms
};
