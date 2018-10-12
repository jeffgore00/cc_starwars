import React from 'react';
import ErrorMessage from './ErrorMessage';

const CharacterList = ({
  characters,
  handleCharacterSelect,
  handleCharacterDeselect,
  selectedCharacter,
  error
}) => (
  <div>
    {selectedCharacter && !error ? <div>Loading...</div> : null}
    {characters ? (
      <ul>
        {characters.sort((a, b) => a.order - b.order).map(character => (
          <li
            key={character.id}
            onClick={event => handleCharacterSelect(event, character.id)}
          >
            {character.name}
          </li>
        ))}
      </ul>
    ) : null}
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
