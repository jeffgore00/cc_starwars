import React from 'react';

const CharacterList = ({ characters, handleClick }) => (
  <div>
    {characters ? (
      <ul>
        {characters.sort((a, b) => a.order - b.order).map(character => (
          <li
            key={character.id}
            onClick={event => handleClick(event, character.id)}
          >
            {character.name}
          </li>
        ))}
      </ul>
    ) : null}
  </div>
);

export default CharacterList;
