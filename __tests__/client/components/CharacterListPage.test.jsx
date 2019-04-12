import React from 'react';
import { shallow } from 'enzyme';
import CharacterListPage from '../../../src/client/components/CharacterListPage';
import CharacterList from '../../../src/client/components/CharacterList';

const handleCharacterSelect = jest.fn()
const handleCharacterDeselect = jest.fn()

const requiredProps = {
  handleCharacterSelect,
  handleCharacterDeselect
}

describe('CharacterListPage', () => {
  it('should render a <CharacterList>', () => {
    const container = shallow(<CharacterListPage {...requiredProps} />);
    expect(container.exists(CharacterList)).toBe(true);
  });
});
