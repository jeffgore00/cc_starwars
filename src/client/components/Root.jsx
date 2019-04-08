import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {
  fetchCharacters,
  toggleCharacterSelection,
  charactersUpdated,
  fetchCharacterFilms,
  filmsCleared
} from '../store';
import CharacterListContainer from './CharacterListContainer';
import FilmListContainer from './FilmListContainer';
import { getCharacter, selected } from '../store/characters';
import { characterShape, filmShape } from '../../utils-shared'

export class Root extends Component {
  constructor() {
    super();
    this.handleCharacterSelect = this.handleCharacterSelect.bind(this);
    this.handleCharacterDeselect = this.handleCharacterDeselect.bind(this);
  }

  componentDidMount() {
    const { loadCharacters } = this.props;
    loadCharacters();
  }

  handleCharacterSelect(event, charId) {
    const { selectCharacter, loadFilms, characters } = this.props;
    selectCharacter(characters, charId);
    loadFilms(charId);
  }

  handleCharacterDeselect(event, charId) {
    const { selectCharacter, clearFilms, characters } = this.props;
    selectCharacter(characters, charId);
    clearFilms();
  }

  render() {
    const { characters, selectedCharacter, films, error } = this.props;
    return (
      <div>
        {selectedCharacter && films.length > 0 ? (
          <FilmListContainer
            character={selectedCharacter}
            films={films}
            handleCharacterDeselect={this.handleCharacterDeselect}
          />
        ) : (
          <CharacterListContainer
            characters={characters}
            handleCharacterSelect={this.handleCharacterSelect}
            handleCharacterDeselect={this.handleCharacterDeselect}
            selectedCharacter={selectedCharacter}
            error={error}
          />
        )}
      </div>
    );
  }
}

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
  error: null,
}

Root.propTypes = {
  characters: PropTypes.arrayOf(characterShape),
  films: PropTypes.arrayOf(filmShape),
  selectCharacter: PropTypes.func.isRequired,
  loadFilms: PropTypes.func.isRequired,
  loadCharacters: PropTypes.func.isRequired,
  clearFilms: PropTypes.func.isRequired,
  selectedCharacter: characterShape,
  error: PropTypes.string,
}

export default connect(
  mapState,
  mapDispatch
)(Root);
