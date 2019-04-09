import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'semantic-ui-react';
import CharacterCard from '../../../src/client/components/CharacterCard';

describe('CharacterCard ', () => {
  it('should render a <Card>', () => {
    const card = shallow(
      <CharacterCard key="1" name="Emperor Palpatine" />
    );
    expect(card.exists(Card)).toBe(true);
    // expect(card.find(Card)) alone, for truthiness, never works, because it always returns a ReactWrapper
  });
});
