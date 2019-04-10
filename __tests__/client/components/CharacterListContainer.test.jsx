import React from 'react';
import { shallow } from 'enzyme';
import CharacterListPage from '../../../src/client/components/CharacterListPage';
import CharacterList from '../../../src/client/components/CharacterList';

describe('CharacterListPage', () => {
  it('should render a <CharacterList>', () => {
    const container = shallow(<CharacterListPage />);
    expect(container.exists(CharacterList)).toBe(true);
  });
});
