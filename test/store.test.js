import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { expect } from 'chai';
import { readFile } from '../server/utils-server';
import {
  reducer,
  addAdminPropsToCharacters,
  fetchCharacters
} from '../client/store';

const path = require('path');
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
  characters: [],
  films: null,
  error: null
};
const store = mockStore(initialState);

async function loadCharacterFile() {
  const characterJSON = await readFile(
    path.join(__dirname, '../characters.json'),
    'utf-8'
  );
  return characterJSON;
}

let charactersJSON;
let initialCharacters;
let groomedCharacters;

describe('Redux Store', () => {
  before(async () => {
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
  });

  it('addAdminPropsToCharacters() should add "id", "selected", and "order" properties', () => {
    const updatedCharacters = addAdminPropsToCharacters(initialCharacters);
    expect(updatedCharacters[0].selected).to.equal(false);
    expect(updatedCharacters[0].order).to.equal(1);
    expect(updatedCharacters[0].id).to.equal(1);
  });

  it('addAdminPropsToCharacters() should retain existing character properties "name" and "url"', () => {
    const updatedCharacters = addAdminPropsToCharacters(initialCharacters);

    expect(updatedCharacters[0].name).to.equal('Luke Skywalker');
    expect(updatedCharacters[0].url).to.equal('https://swapi.co/api/people/1/');
  });

  it('fetchCharacters() returns a thunk which make a GET request to the /api/characters route and dispatches a CHARACTERS_LOADED action', async () => {
    mock.onGet('/api/characters').replyOnce(200, initialCharacters);
    await store.dispatch(fetchCharacters());
    const actions = store.getActions();
    expect(actions[0].type).to.equal('CHARACTERS_LOADED');
    expect(actions[0].characters).to.deep.equal(groomedCharacters);
  });
});

describe('reducer', () => {
  it('CHARACTERS_LOADED case should populate "characters" slice of state with groomed characters', () => {
    const newState = reducer(initialState, {
      type: 'CHARACTERS_LOADED',
      characters: groomedCharacters
    });
    expect(newState.characters).to.deep.equal(groomedCharacters);
  });
});
