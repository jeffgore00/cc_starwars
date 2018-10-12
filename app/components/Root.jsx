import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchCharacters,
  updateCharacterSelection,
  charactersUpdated,
  fetchCharacterFilms,
  filmsCleared
} from '../store';
import CharacterList from './CharacterList';
import FilmList from './FilmList';

class Root extends Component {
  constructor() {
    super();
    this.handleCharacterSelect = this.handleCharacterSelect.bind(this);
    this.handleCharacterDeselect = this.handleCharacterDeselect.bind(this);
  }

  componentDidMount() {
    this.props.loadCharacters();
  }

  handleCharacterSelect(event, charId) {
    this.props.selectCharacter(this.props.characters, charId);
    this.props.loadFilms(charId);
  }

  handleCharacterDeselect(event, charId) {
    this.props.selectCharacter(this.props.characters, charId);
    this.props.clearFilms();
  }

  render() {
    const { characters, selectedCharacter, films, error } = this.props;
    return (
      <div>
        {selectedCharacter && films.length ? (
          <FilmList
            character={selectedCharacter}
            films={films}
            handleCharacterDeselect={this.handleCharacterDeselect}
          />
        ) : (
          <CharacterList
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
  const selectedCharacters = characters.filter(character => character.selected);
  let selectedCharacter = null;
  if (selectedCharacters.length) {
    selectedCharacter = selectedCharacters[0];
  }
  return {
    characters,
    films,
    error,
    selectedCharacter
  };
};

const mapDispatch = dispatch => {
  return {
    loadCharacters: () => dispatch(fetchCharacters()),
    selectCharacter: (characters, charId) => {
      const updatedCharacters = updateCharacterSelection(characters, charId);
      dispatch(charactersUpdated(updatedCharacters));
    },
    loadFilms: charId => dispatch(fetchCharacterFilms(charId)),
    clearFilms: () => dispatch(filmsCleared())
  };
};

export default connect(
  mapState,
  mapDispatch
)(Root);
