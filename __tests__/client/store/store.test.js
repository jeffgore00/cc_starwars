import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { readFile } from '../../../src/server/utils-server';
import {
  reducer,
  addAdminPropsToCharacters,
  fetchCharacters,
  fetchCharacterFilms,
  toggleCharacterSelection,
  charactersUpdated,
  filmsCleared
} from '../../../src/client/store';

const path = require('path');
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
  characters: [],
  films: [],
  error: null
};
let store = mockStore(initialState);

async function loadCharacterFile() {
  const characterJSON = await readFile(
    path.join(__dirname, '../../../src/characters.json'),
    'utf-8'
  );
  return characterJSON;
}

let charactersJSON;
let initialCharacters;
let groomedCharacters;
const sampleFilms = [
  {
    id: 4,
    episodeId: 4,
    title: 'A New Hope',
    date: new Date('1977-05-25'),
    desc: 'A fun ROMP through the universe.'
  },
  {
    id: 5,
    episodeId: 5,
    title: 'The Empire Strikes Back',
    date: new Date('1980-05-21'),
    desc: 'An even funner ROMP through the universe.'
  }
]

describe('Redux Store', () => {
  beforeAll(async () => {
    charactersJSON = await loadCharacterFile();
    const parsedJSON = JSON.parse(charactersJSON);
    initialCharacters = parsedJSON.characters;
    groomedCharacters = addAdminPropsToCharacters(initialCharacters);
  });

  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    store = mockStore(initialState);
  });

  it('addAdminPropsToCharacters() should add "id", "selected", and "order" properties', () => {
    const updatedCharacters = addAdminPropsToCharacters(initialCharacters);
    expect(updatedCharacters[0].selected).toEqual(false);
    expect(updatedCharacters[0].order).toEqual(1);
    expect(updatedCharacters[0].id).toEqual(1);
  });

  it('addAdminPropsToCharacters() should retain existing character properties "name" and "url"', () => {
    const updatedCharacters = addAdminPropsToCharacters(initialCharacters);

    expect(updatedCharacters[0].name).toEqual('Luke Skywalker');
    expect(updatedCharacters[0].url).toEqual('https://swapi.dev/api/people/1/');
  });

  it('charactersUpdated() should be an action creator which returns an action of type CHARACTERS_UPDATED', () => {
    const action = charactersUpdated(initialCharacters);

    expect(action.type).toEqual('CHARACTERS_UPDATED');
    expect(action.characters).toEqual(initialCharacters);
  });

  it('fetchCharacters() returns a thunk which make a GET request to the /api/characters route and dispatches a CHARACTERS_LOADED action', async () => {
    mock.onGet('/api/characters').replyOnce(200, initialCharacters);
    await store.dispatch(fetchCharacters());
    const actions = store.getActions();
    expect(actions[0].type).toEqual('CHARACTERS_LOADED');
    expect(actions[0].characters).toEqual(groomedCharacters);
  });

  it('fetchCharacters() should dispatch an ERROR_REPORTED action if an error occurs', async () => {
    const error = new Error();
    error.response = {
      data: 'sorry'
    };
    mock.onGet('/api/characters').replyOnce(() => Promise.reject(error));
    await store.dispatch(fetchCharacters());
    const actions = store.getActions();
    expect(actions[0].type).toEqual('ERROR_REPORTED');
    expect(actions[0].error).toEqual('sorry');
  });

  it('fetchCharacterFilms() returns a thunk which make a GET request to the /api/characters/${charId}/films route and dispatches a FILMS_LOADED action', async () => {
    mock.onGet('/api/characters/1/films').replyOnce(200, sampleFilms);
    await store.dispatch(fetchCharacterFilms(1));
    const actions = store.getActions();
    expect(actions[0].type).toEqual('FILMS_LOADED');
    expect(actions[0].films).toEqual(sampleFilms);
  });

  it('fetchCharacterFilms() should dispatch an ERROR_REPORTED action if an error occurs', async () => {
    const error = new Error();
    error.response = {
      data: 'sorry'
    };
    mock.onGet('/api/characters/1/films').replyOnce(() => Promise.reject(error));
    await store.dispatch(fetchCharacterFilms(1));
    const actions = store.getActions();
    expect(actions[0].type).toEqual('ERROR_REPORTED');
    expect(actions[0].error).toEqual('sorry');
  });
});

describe('reducer', () => {
  it('CHARACTERS_LOADED case should populate "characters" slice of state with groomed characters', () => {
    const newState = reducer(initialState, {
      type: 'CHARACTERS_LOADED',
      characters: groomedCharacters
    });
    expect(newState.characters).toEqual(groomedCharacters);
  });

  it('FILMS_LOADED case should populate "characters" slice of state with groomed characters', () => {
    const newState = reducer(initialState, {
      type: 'FILMS_LOADED',
      films: sampleFilms
    });
    expect(newState.films).toEqual(sampleFilms);
  });

  it('FILMS_CLEARED case should clear the films slice of state, restoring to empty array', () => {
    const newState = reducer(initialState, filmsCleared());
    expect(newState.films).toEqual([]);
  });

  it('ERROR_REPORTED case should populate "errors" slice of state with error message', () => {
    const newState = reducer(initialState, {
      type: 'ERROR_REPORTED',
      error: 'Failed to connect to SWAPI server.'
    });
    expect(newState.error).toEqual('Failed to connect to SWAPI server.');
  });

  it('ERROR_ACKNOWLEDGED case should clear "errors" slice of state', () => {
    const newState = reducer(initialState, {
      type: 'ERROR_ACKNOWLEDGED',
      error: null
    });
    expect(newState.error).toEqual(null);
  });
});

describe('selectors', () => {
  it('toggleCharacterSelection should return an array of characters in which the givenId is selected', () => {
    const characters = [
      { id: 1, name: 'Obi Wan Kenobi', selected: false },
      { id: 2, name: 'Luke Skywalker', selected: false }
    ];
    const updatedCharacters = toggleCharacterSelection(characters, 2);
    expect(updatedCharacters).toEqual([
      { id: 1, name: 'Obi Wan Kenobi', selected: false },
      { id: 2, name: 'Luke Skywalker', selected: true }
    ]);
  });
});
