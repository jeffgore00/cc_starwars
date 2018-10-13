function convertToFilename(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(' ', '-');
}

function logErrorAndRespond(err, res, log, source, severity) {
  const customError = buildErrorPayload(err, source, severity);
  log.write(buildErrorLog(customError));
  res.status(err.statusCode).send(customError);
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

function buildErrorMessage(source, statusCode) {
  if (statusCode === 404) {
    if (source === 'SWAPI') {
      return 'The requested content could not be found on the SWAPI server.';
    } else {
      return 'That requested content could not be found.';
    }
  } else if (statusCode === 500) {
    if (source === 'SWAPI') {
      return 'There was a SWAPI internal server error. Please try your request again later.';
    } else {
      return 'There was an internal server error. It was been logged and we will investigate. Our apologies!';
    }
  } else {
    return 'There was an error. Please try again later.';
  }
}

function groomFilmData(rawFilm, id) {
  return {
    id,
    title: rawFilm.title,
    date: rawFilm.release_date,
    desc: rawFilm.opening_crawl
      ? rawFilm.opening_crawl.replace('\r\n', ' ')
      : null
  };
}

function extractIDFromAPIRoute(route) {
  const secondToLastSlash = route.lastIndexOf('/', route.length - 2);
  const idStr = route.slice(secondToLastSlash + 1, route.length - 1);
  const id = Number(idStr);
  return isNaN(id) ? idStr : id;
  /*
  Normally, I would have not written the code above, and instead used the below.
  But because I think the point of this exercise is to see how I may handle an
  error resulting from an asynchronous request to an external API, I am letting
  invalid IDs pass on through.

   if (id === 0 || isNaN(id) || !Number.isInteger(id)) {
     throw new Error(
       'The URI supplied either does not contain a valid ID, or is not the appropriate URI for ID extraction.'
     );
   } else {
      return id;
   }
  */
}

function extractIDsFromAPIRoutes(routes) {
  return routes.map(route => extractIDFromAPIRoute(route));
}

module.exports = {
  convertToFilename,
  groomFilmData,
  extractIDFromAPIRoute,
  extractIDsFromAPIRoutes,
  buildErrorPayload,
  buildErrorMessage,
  buildErrorLog,
  logErrorAndRespond
};
