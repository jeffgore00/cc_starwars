import React from 'react';

const CharacterList = ({
  characters,
  handleCharacterSelect,
  selectedCharacter,
  error
}) => (
  <div>
    {error ? alert('There was an error') : null}
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
  </div>
);

export default CharacterList;
