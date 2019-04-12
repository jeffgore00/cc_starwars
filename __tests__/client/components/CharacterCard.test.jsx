import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'semantic-ui-react';
import CharacterCard from '../../../src/client/components/CharacterCard';

const handleCharacterSelect = jest.fn();
const onClickMock = jest.fn(() => handleCharacterSelect())

describe('CharacterCard ', () => {
  it('should render a <Card>', () => {
    const card = shallow(<CharacterCard key="1" name="Emperor Palpatine" onClick={onClickMock} />);
    expect(card.exists(Card)).toBe(true);
  });

  it('should have a click handler that handles character selection when called', () => {
    const card = shallow(<CharacterCard key="1" name="Emperor Palpatine" onClick={onClickMock} />);
    card.props().onClick();
    expect(handleCharacterSelect).toHaveBeenCalled();
  });
});
