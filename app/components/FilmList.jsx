import React from 'react';
import FilmCard from './FilmCard';

const FilmList = ({ character, films, handleCharacterDeselect }) => (
  <div>
    <h1>Films for {character.name}</h1>
    <button
      onClick={event => handleCharacterDeselect(event, character.id)}
      type="button"
    >
      Back
    </button>
    {films
      ? films.map(film => (
          <FilmCard key={film.id} title={film.title} desc={film.desc} />
        ))
      : null}
  </div>
);

export default FilmList;
