import React from 'react';
import { mount } from 'enzyme';
import FilmListPage from '../../../src/client/components/FilmListPage';
import FilmList from '../../../src/client/components/FilmList';

const handleCharacterDeselect = jest.fn();

const props = {
  handleCharacterDeselect,
  films: [
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
  ],
  character: { id: 1, name: 'Obi Wan Kenobi' }
};

describe('FilmListPage ', () => {
  it('renders a FilmList', () => {
    const filmList = mount(<FilmListPage {...props} />);
    expect(filmList.exists(FilmList)).toBe(true);
  });

  it('calls handleCharacterDeselect on click', () => {
    const filmList = mount(<FilmListPage {...props} />);
    const backButton = filmList.childAt(0).childAt(0).childAt(1)
    backButton.props().onClick();
    expect(handleCharacterDeselect).toHaveBeenCalled();
  });
});
