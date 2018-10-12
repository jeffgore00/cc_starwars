import axios from 'axios';
import { errorReported } from './error';
import { extractIDFromAPIRoute } from '../../utils';

/**
 * ACTION TYPES
 */

const CHARACTERS_LOADED = 'CHARACTERS_LOADED';
const CHARACTERS_UPDATED = 'CHARACTERS_UPDATED';

/**
 * ACTION CREATORS
 */
export const charactersLoaded = characters => ({
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
      const characters = addAdminPropsToCharacters(res.data);
      dispatch(charactersLoaded(characters));
    })
    .catch(err => dispatch(errorReported(err)));

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

/*
SELECTORS / UTIL FUNCS
*/
const newlySelected = (character, selectionId) => character.id === selectionId;

export function addAdminPropsToCharacters(characters) {
  return characters.map((character, idx) => ({
    ...character,
    id: extractIDFromAPIRoute(character.url),
    selected: false,
    order: idx + 1
  }));
}

export function getSelectedCharacter(characters, attribute, rule) {
  const selectedCharacters = characters.filter(character =>
    rule(character, attribute));
  return selectedCharacters.length ? selectedCharacters[0] : null;
}

export const updateCharacterSelection = (characters, selectionId) => {
  const newlySelectedCharacter = getSelectedCharacter(
    characters,
    selectionId,
    newlySelected
  );
  const otherCharacters = characters.filter(
    character => character.id !== newlySelectedCharacter.id
  );
  newlySelectedCharacter.selected = !newlySelectedCharacter.selected;
  return [...otherCharacters, newlySelectedCharacter];
};
