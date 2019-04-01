import axios from 'axios';
import { errorReported } from './error';
import { extractIDFromAPIRoute } from '../../utils-shared';

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

const equalsId = (character, selectionId) => character.id === selectionId;
const notEqualsId = (character, selectionId) => character.id !== selectionId;
export const selected = character => character.selected;

export function addAdminPropsToCharacters(characters) {
  return characters.map((character, idx) => ({
    ...character,
    id: extractIDFromAPIRoute(character.url),
    selected: false,
    order: idx + 1
  }));
}

export function getCharacter(characters, rule, ...ruleProps) {
  const selectedCharacters = characters.filter(character =>
    rule(character, ...ruleProps));
  return selectedCharacters.length ? selectedCharacters[0] : null;
}

export function getCharacters(characters, rule, ...ruleProps) {
  const selectedCharacters = characters.filter(character =>
    rule(character, ...ruleProps));
  return selectedCharacters;
}

export const toggleCharacterSelection = (characters, selectionId) => {
  const character = getCharacter(characters, equalsId, selectionId);
  character.selected = !character.selected;
  const otherCharacters = getCharacters(characters, notEqualsId, selectionId);
  return [...otherCharacters, character];
};
