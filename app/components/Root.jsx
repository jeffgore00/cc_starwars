import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchCharacters,
  updateCharacterSelection,
  charactersUpdated,
  fetchCharacterFilms
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
  }

  render() {
    const { characters, selectedCharacter, films } = this.props;
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
            selectedCharacter={selectedCharacter}
          />
        )}
      </div>
    );
  }
}

const mapState = ({ characters, films }) => {
  const selectedCharacters = characters.filter(character => character.selected);
  let selectedCharacter = null;
  if (selectedCharacters.length) {
    selectedCharacter = selectedCharacters[0];
  }
  return {
    characters,
    films,
    selectedCharacter
  };
};

const mapDispatch = dispatch => {
  return {
    loadCharacters: () => dispatch(fetchCharacters()),
    loadFilms: charId => dispatch(fetchCharacterFilms(charId)),
    selectCharacter: (characters, charId) => {
      const updatedCharacters = updateCharacterSelection(characters, charId);
      dispatch(charactersUpdated(updatedCharacters));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Root);
