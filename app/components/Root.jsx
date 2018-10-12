import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchCharacters,
  updateCharacterSelection,
  charactersUpdated
} from '../store';
import CharacterList from './CharacterList';

class Root extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.loadCharacters();
  }

  handleClick(event, charId) {
    this.props.selectCharacter(this.props.characters, charId);
  }

  render() {
    return (
      <div>
        <CharacterList
          characters={this.props.characters}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

const mapState = ({ characters }) => {
  const selectedCharacters = characters.filter(character => character.selected);
  let selectedCharacter = null;
  if (selectedCharacters.length) {
    selectedCharacter = selectedCharacters[0].id;
  }
  return {
    characters,
    selectedCharacter
  };
};

const mapDispatch = dispatch => {
  return {
    loadCharacters: () => dispatch(fetchCharacters()),
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
