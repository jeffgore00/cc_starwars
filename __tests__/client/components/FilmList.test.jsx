import React from 'react';
import { shallow } from 'enzyme';
import FilmList from '../../../src/client/components/FilmList';
import FilmCard from '../../../src/client/components/FilmCard';

const props = {
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
  ]
};

describe('FilmList ', () => {
  it('does not render FilmCard components if it does not receive a films prop', () => {
    const filmList = shallow(<FilmList />);
    expect(filmList.exists(FilmCard)).toBe(false);
  });

  it('renders FilmCard components if it does receive an array of films', () => {
    const filmList = shallow(<FilmList {...props} />);
    expect(filmList.exists(FilmCard)).toBe(true);
  });
});
