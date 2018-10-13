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

export const fetchCharacters = () => async dispatch => {
  try {
    const response = await axios.get('/api/characters');
    const characters = addAdminPropsToCharacters(response.data);
    dispatch(charactersLoaded(characters));
  } catch (err) {
    dispatch(errorReported(err.response.data));
  }
};

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
const selected = (character, selectionId) => character.id === selectionId;
const notSelected = (character, selectionId) => character.id !== selectionId;

export function addAdminPropsToCharacters(characters) {
  return characters.map((character, idx) => ({
    ...character,
    id: extractIDFromAPIRoute(character.url),
    selected: false,
    order: idx + 1
  }));
}

export function getCharacter(characters, attribute, rule) {
  const selectedCharacters = characters.filter(character =>
    rule(character, attribute));
  return selectedCharacters.length ? selectedCharacters[0] : null;
}

export function getCharacters(characters, attribute, rule) {
  const selectedCharacters = characters.filter(character =>
    rule(character, attribute));
  return selectedCharacters;
}

export const toggleCharacterSelection = (characters, selectionId) => {
  const character = getCharacter(characters, selectionId, selected);
  character.selected = !character.selected;
  const otherCharacters = getCharacters(characters, selectionId, notSelected);
  return [...otherCharacters, character];
};
