import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import ConnectedRoot, { Root } from '../../../src/client/components/Root';
import FilmListPage from '../../../src/client/components/FilmListPage';
import CharacterListPage from '../../../src/client/components/CharacterListPage';
import {
  fetchCharacters,
  toggleCharacterSelection,
  charactersUpdated,
  fetchCharacterFilms,
  filmsCleared
} from '../../../src/client/store';

jest.mock('../../../src/client/store', () => ({
  fetchCharacters: jest.fn(() => ({ type: 'TEST' })),
  toggleCharacterSelection: jest.fn(() => ({ type: 'TEST' })),
  charactersUpdated: jest.fn(() => ({ type: 'TEST' })),
  fetchCharacterFilms: jest.fn(() => ({ type: 'TEST' })),
  filmsCleared: jest.fn(() => ({ type: 'TEST' }))
}));

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const defaultReduxState = {
  characters: [{ id: 1, name: 'Obi Wan Kenobi' }],
  films: [
    {
      id: 4,
      episodeId: 4,
      title: 'A New Hope',
      date: new Date('1977-05-25'),
      desc: 'A fun ROMP through the universe.'
    }
  ],
  error: null
};

const store = mockStore(defaultReduxState);

const loadCharactersMock = jest.fn();
const selectCharacterMock = jest.fn();
const loadFilmsMock = jest.fn();
const clearFilmsMock = jest.fn();

const funcPropMocks = {
  loadCharacters : loadCharactersMock,
  selectCharacter: selectCharacterMock,
  loadFilms: loadFilmsMock,
  clearFilms: clearFilmsMock
};

const defaultProps = {
  ...defaultReduxState,
  selectedCharacter: null,
  ...funcPropMocks
};

describe('Root ', () => {
  it('should render a <CharacterListPage> by default', () => {
    const component = shallow(<Root {...defaultProps} />);
    expect(component.exists(CharacterListPage)).toBe(true);
    expect(component.exists(FilmListPage)).toBe(false);
  });

  it('should render a <FilmListPage> if selectedCharacter and films.length is true', () => {
    const component = shallow(
      <Root
        {...defaultProps}
        selectedCharacter={{ id: 1, name: 'Obi Wan Kenobi' }}
      />
    );
    expect(component.exists(FilmListPage)).toBe(true);
    expect(component.exists(CharacterListPage)).toBe(false);
  });
});

describe('Connected Root ', () => {
  it('should call fetchCharacters on mount', () => {
    mount(<ConnectedRoot store={store} />);
    expect(fetchCharacters).toHaveBeenCalled();
  });

  it('should call selectCharacter and loadFilms in handleCharacterSelect', () => {
    const wrapper = mount(<ConnectedRoot store={store} />);
    const wrappee = wrapper.childAt(0)
    wrappee.instance().handleCharacterSelect(null, 1);
    expect(toggleCharacterSelection).toHaveBeenCalled();
    expect(charactersUpdated).toHaveBeenCalled();
    expect(fetchCharacterFilms).toHaveBeenCalled();
  });

  it('should call clearFilms in handleCharacterSelect', () => {
    const wrapper = mount(<ConnectedRoot store={store} />);
    const wrappee = wrapper.childAt(0);
    wrappee.instance().handleCharacterDeselect(null, 1);
    expect(filmsCleared).toHaveBeenCalled();
  });
});
