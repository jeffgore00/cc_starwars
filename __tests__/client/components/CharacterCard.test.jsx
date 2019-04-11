import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'semantic-ui-react';
import CharacterCard from '../../../src/client/components/CharacterCard';

const onClickMock = jest.fn()

describe('CharacterCard ', () => {
  it('should render a <Card>', () => {
    const card = shallow(
      <CharacterCard key="1" name="Emperor Palpatine" onClick={onClickMock}/>
    );
    expect(card.exists(Card)).toBe(true);
  });
});
