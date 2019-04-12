import React from 'react';
import { mount } from 'enzyme';
import { Item } from 'semantic-ui-react';
import FilmCard from '../../../src/client/components/FilmCard';

const props = {
  episode: 4,
  title: 'A New Hope',
  date: new Date('1977-05-25'),
  desc: 'A fun ROMP through the universe.'
}

describe('The FilmCard Component', () => {
  it('renders a Semantic UI Item', () => {
    const errorMessage = mount(<FilmCard {...props}/>);
    expect(errorMessage.exists(Item)).toBe(true);
  });
});
