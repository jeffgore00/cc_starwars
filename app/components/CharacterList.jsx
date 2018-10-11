import React from 'react';

const CharacterList = ({ characters }) => (
  <div>
    {characters ? (
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    ) : null}
  </div>
);

export default CharacterList;
