import React from 'react';
import CharacterCard from './CharacterCard';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

const CharacterList = ({
  characters,
  handleCharacterSelect,
  handleCharacterDeselect,
  selectedCharacter,
  error
}) => (
  <div id="character-list">
    {selectedCharacter && !error ? <Loading /> : null}
    {characters
      ? characters
          .sort((a, b) => a.order - b.order)
          .map(character => (
            <CharacterCard
              key={character.id}
              name={character.name}
              onClick={event => handleCharacterSelect(event, character.id)}
            />
          ))
      : null}
    {selectedCharacter && selectedCharacter.id && error ? (
      <ErrorMessage
        error={error}
        execRollbackActions={() =>
          handleCharacterDeselect(null, selectedCharacter.id)
        }
      />
    ) : null}
  </div>
);

export default CharacterList;