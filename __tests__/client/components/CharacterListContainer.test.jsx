import React from 'react';
import { shallow } from 'enzyme';
import CharacterPage from '../../../src/client/components/CharacterPage';
import CharacterList from '../../../src/client/components/CharacterList';

describe('CharacterPage', () => {
  it('should render a <CharacterList>', () => {
    const container = shallow(<CharacterPage />);
    expect(container.exists(CharacterList)).toBe(true);
  });
});
