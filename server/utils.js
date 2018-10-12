function groomFilmData(rawFilms) {
  return rawFilms.map(rawFilm => {
    return {
      id: rawFilm.filmId,
      title: rawFilm.title,
      date: rawFilm.release_date,
      desc: rawFilm.opening_crawl
        ? rawFilm.opening_crawl.replace('\r\n', ' ')
        : null
    };
  });
}

module.exports = { groomFilmData };
