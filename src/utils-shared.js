/* eslint-disable no-restricted-globals */
import PropTypes from 'prop-types';

export function extractIDFromAPIRoute(route) {
  const secondToLastSlash = route.lastIndexOf('/', route.length - 2);
  const idStr = route.slice(secondToLastSlash + 1, route.length - 1);
  const id = Number(idStr);
  return isNaN(id) ? idStr : id;
  /*
  Normally, I would have not written the code above, and instead used the below.
  But because I think the point of this exercise is to see how I may handle an
  error resulting from an asynchronous request to an external API, I am letting
  invalid IDs pass on through.

   if (id === 0 || isNaN(id) || !Number.isInteger(id)) {
     throw new Error(
       'The URI supplied either does not contain a valid ID, or is not the appropriate URI for ID extraction.'
     );
   } else {
      return id;
   }
  */
}

export function extractIDsFromAPIRoutes(routes) {
  return routes.map(route => extractIDFromAPIRoute(route));
}

export const characterShape = PropTypes.shape({
  id: PropTypes.any, // to allow purposeful "unknown" Obi bug through
  name: PropTypes.string,
  order: PropTypes.number,
  selected: PropTypes.bool,
  url: PropTypes.string
});

export const filmShape = PropTypes.shape({
  date: PropTypes.date,
  desc: PropTypes.string,
  episodeId: PropTypes.number,
  id: PropTypes.any,
  title: PropTypes.string
});
