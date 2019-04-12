import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCharacters,
  toggleCharacterSelection,
  charactersUpdated,
  fetchCharacterFilms,
  filmsCleared
} from '../store';
import CharacterListPage from './CharacterListPage';
import FilmListPage from './FilmListPage';
import { getCharacter, selected } from '../store/characters';
import { characterShape, filmShape } from '../../utils-shared';

const Root = ({
  characters,
  selectedCharacter,
  selectCharacter,
  loadCharacters,
  films,
  loadFilms,
  clearFilms,
  error
}) => {
  useEffect(() => {
    loadCharacters();
  }, []);

  const handleCharacterSelect = (event, charId) => {
    selectCharacter(characters, charId);
    loadFilms(charId);
  };

  const handleCharacterDeselect = (event, charId) => {
    selectCharacter(characters, charId);
    clearFilms();
  };

  return (
    <div>
      {selectedCharacter && films.length > 0 ? (
        <FilmListPage
          character={selectedCharacter}
          films={films}
          handleCharacterDeselect={handleCharacterDeselect}
        />
      ) : (
        <CharacterListPage
          characters={characters}
          handleCharacterSelect={handleCharacterSelect}
          handleCharacterDeselect={handleCharacterDeselect}
          selectedCharacter={selectedCharacter}
          error={error}
        />
      )}
    </div>
  );
};

const mapState = ({ characters, films, error }) => {
  return {
    characters,
    films,
    error,
    selectedCharacter: getCharacter(characters, selected)
  };
};

const mapDispatch = dispatch => {
  return {
    loadCharacters: () => dispatch(fetchCharacters()),
    selectCharacter: (characters, charId) => {
      const updatedCharacters = toggleCharacterSelection(characters, charId);
      dispatch(charactersUpdated(updatedCharacters));
    },
    loadFilms: charId => dispatch(fetchCharacterFilms(charId)),
    clearFilms: () => dispatch(filmsCleared())
  };
};

Root.defaultProps = {
  characters: null,
  films: null,
  selectedCharacter: null,
  error: null
};

Root.propTypes = {
  characters: PropTypes.arrayOf(characterShape),
  films: PropTypes.arrayOf(filmShape),
  selectCharacter: PropTypes.func.isRequired,
  loadFilms: PropTypes.func.isRequired,
  loadCharacters: PropTypes.func.isRequired,
  clearFilms: PropTypes.func.isRequired,
  selectedCharacter: characterShape,
  error: PropTypes.string
};

export default connect(
  mapState,
  mapDispatch
)(Root);
