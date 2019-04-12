import React from 'react';
import PropTypes from 'prop-types'
import CharacterList from './CharacterList';
import { characterShape } from '../../utils-shared'

const CharacterListPage = ({
  characters,
  handleCharacterSelect,
  handleCharacterDeselect,
  selectedCharacter,
  error
}) => (
  <div id="entire-page-wrapper">
    <div id="main-container">
      <h1 id="main-header">STAR WARS</h1>
      <h2 id="main-subheader">
        Select a character to view a list of films in which they appear.
      </h2>
      <CharacterList
        characters={characters}
        handleCharacterSelect={handleCharacterSelect}
        handleCharacterDeselect={handleCharacterDeselect}
        selectedCharacter={selectedCharacter}
        error={error}
      />
    </div>
  </div>
);

CharacterListPage.defaultProps = {
  characters: null,
  selectedCharacter: null,
  error: null,
}

CharacterListPage.propTypes = {
  characters: PropTypes.arrayOf(characterShape),
  handleCharacterSelect: PropTypes.func.isRequired,
  handleCharacterDeselect: PropTypes.func.isRequired,
  selectedCharacter: characterShape,
  error: PropTypes.string,
}


export default CharacterListPage;
