import React from 'react';
import PropTypes from 'prop-types'
import CharacterCard from './CharacterCard';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import { characterShape } from '../../utils-shared'

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
              onClick={handleCharacterSelect}
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

CharacterList.defaultProps = {
  characters: null,
  selectedCharacter: null,
  error: null,
}

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(characterShape),
  handleCharacterSelect: PropTypes.func.isRequired,
  handleCharacterDeselect: PropTypes.func.isRequired,
  selectedCharacter: characterShape,
  error: PropTypes.string,
}

export default CharacterList;
