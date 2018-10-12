import React from 'react';

const FilmList = ({ character, films, handleClick }) => (
  <div>
    {films ? (
      <ul>
        {films.map(film => (
          <li key={film.id}>{film.name}</li>
        ))}
      </ul>
    ) : null}
  </div>
);

export default FilmList;
