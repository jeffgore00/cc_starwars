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

module.exports = {
  errorLog,
  logErrorAndRespond,
  buildErrorPayload,
  buildErrorLog,
  groomFilmData
};
