import React from 'react';
import CharacterList from './CharacterList';

const CharacterListContainer = ({
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

export default CharacterListContainer;
