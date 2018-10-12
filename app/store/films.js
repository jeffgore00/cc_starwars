import axios from 'axios';
import { errorReported } from './error';

/**
 * ACTION TYPES
 */

const FILMS_LOADED = 'FILMS_LOADED';

/*
SELECTORS / UTIL FUNCS
*/

/**
 * ACTION CREATORS
 */
const filmsLoaded = films => ({
  type: FILMS_LOADED,
  films
});

/**
 * THUNK CREATORS
 */

export const fetchCharacterFilms = charId => dispatch =>
  axios
    .get(`/api/characters/${charId}/films`)
    .then(res => {
      dispatch(filmsLoaded(res.data));
    })
    .catch(err => dispatch(errorReported(err)));
/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case FILMS_LOADED:
      return action.films;
    default:
      return state;
  }
}
