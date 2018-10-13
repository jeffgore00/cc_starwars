import React from 'react';
import FilmCard from './FilmCard';
import { Item } from 'semantic-ui-react';

const FilmList = ({ character, films, handleCharacterDeselect }) => (
  <div>
    <button
      onClick={event => handleCharacterDeselect(event, character.id)}
      type="button"
    >
      Back
    </button>
    <Item.Group divided>
      {films
        ? films
            .sort((a, b) => a.episodeId - b.episodeId)
            .map(film => (
              <FilmCard
                key={film.id}
                episode={film.episodeId}
                title={film.title}
                desc={film.desc}
                date={film.date}
              />
            ))
        : null}
    </Item.Group>
  </div>
);

export default FilmList;
