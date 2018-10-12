import axios from 'axios';

/**
 * ACTION TYPES
 */

const CHARACTERS_LOADED = 'CHARACTERS_LOADED';
const CHARACTERS_UPDATED = 'CHARACTERS_UPDATED';

/*
SELECTORS / UTIL FUNCS
*/
export const sortCharactersInOrder = characters =>
  characters.sort((a, b) => a.order - b.order);

const addSelectedPropToCharacters = characters =>
  characters.map((character, idx) => ({
    ...character,
    selected: false,
    order: idx + 1
  }));

export const updateCharacterSelection = (characters, charId) => {
  const alreadySelectedCharacters = characters.filter(
    character => character.selected && character.id !== charId
  );
  const alreadySelectedCharacter = alreadySelectedCharacters.length
    ? alreadySelectedCharacters[0]
    : null;
  const newlySelectedCharacter = characters.filter(
    character => character.id === charId
  )[0];
  const selectedCharacterIds = [
    alreadySelectedCharacter ? alreadySelectedCharacter.id : null,
    newlySelectedCharacter.id
  ];
  const otherCharacters = characters.filter(
    character => !selectedCharacterIds.includes(character.id)
  );
  newlySelectedCharacter.selected = !newlySelectedCharacter.selected;
  if (alreadySelectedCharacter) {
    alreadySelectedCharacter.selected = false;
    return [
      ...otherCharacters,
      alreadySelectedCharacter,
      newlySelectedCharacter
    ];
  } else {
    return [...otherCharacters, newlySelectedCharacter];
  }
};

/**
 * ACTION CREATORS
 */
const charactersLoaded = characters => ({
  type: CHARACTERS_LOADED,
  characters
});

export const charactersUpdated = characters => ({
  type: CHARACTERS_UPDATED,
  characters
});

/**
 * THUNK CREATORS
 */
export const fetchCharacters = () => dispatch =>
  axios
    .get(`/api/characters`)
    .then(res => {
      const characters = addSelectedPropToCharacters(res.data);
      dispatch(charactersLoaded(characters));
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case CHARACTERS_LOADED:
    case CHARACTERS_UPDATED:
      return action.characters;
    default:
      return state;
  }
}
