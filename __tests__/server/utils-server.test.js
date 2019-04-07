import request from 'supertest';
import utils, { groomFilmData } from '../../src/server/utils-server';

describe('groomFilmData', () => {
  beforeEach(() => jest.resetModules());

  it('assigns the correct id', () => {
    const rawFilm = {
      title: 'A New Hope',
      release_date: '1979-04-03',
      opening_crawl: null,
      episode_id: 4
    };
    const groomedFilm = groomFilmData(rawFilm, 1);
    expect(groomedFilm.id).toEqual(1);
  });
});

describe('fetchFilms', () => {
  it('does the right thing', () => {
    jest.mock('request-promise', () =>
      jest.fn(() => Promise.reject(new Error('request-promise failed')))
    );
    jest.spyOn(utils, 'groomFilmData').mockImplementation(() => {})
    const { fetchFilms } = require('../../src/server/utils-server');
    return fetchFilms([1, 2, 3, 4]).catch(err => {
      expect(err.message).toEqual('No films loaded!');
    });
  });
});
