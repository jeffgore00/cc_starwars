import { extractIDsFromAPIRoutes } from '../src/utils-shared';

describe('shared utils ', () => {
  it('extractIDsFromAPIRoutes should do just that', () => {
    const apiRoutes = [
      'https://swapi.co/api/characters/2/',
      'https://swapi.co/api/characters/6/',
      'https://swapi.co/api/characters/3/',
      'https://swapi.co/api/characters/13/',
      'https://swapi.co/api/characters/7/'
    ];
    const extractedIds = extractIDsFromAPIRoutes(apiRoutes);
    expect(extractedIds).toEqual([2, 6, 3, 13, 7]);
  });
});
