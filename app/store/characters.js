import axios from 'axios';

/**
 * ACTION TYPES
 */

const CHARACTERS_LOADED = 'CHARACTERS_LOADED';
const CHARACTER_SELECTED = 'CHARACTER_SELECTED';

/**
 * ACTION CREATORS
 */
const charactersLoaded = characters => ({
  type: CHARACTERS_LOADED,
  characters
});

const characterSelected = charName => ({
  type: CHARACTER_SELECTED,
  charName
});

/**
 * THUNK CREATORS
 */
export const fetchCharacters = () => dispatch =>
  axios
    .get(`/api/characters`)
    .then(res => dispatch(charactersLoaded(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case CHARACTERS_LOADED:
      return action.characters;
    default:
      return state;
  }
}
