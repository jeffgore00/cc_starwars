import React from 'react';
import FilmList from './FilmList';

const FilmListPage = ({ handleCharacterDeselect, films, character }) => (
  <div id="film-container">
    <nav id="film-header">
      <span id="film-character-name">{character.name.toLowerCase()}</span>
      <span
        id="film-header-go-back"
        onClick={event => handleCharacterDeselect(event, character.id)}
      >
        back&nbsp;
      </span>
    </nav>
    <FilmList
      character={character}
      films={films}
      handleCharacterDeselect={handleCharacterDeselect}
    />
  </div>
);

export default FilmListPage;
