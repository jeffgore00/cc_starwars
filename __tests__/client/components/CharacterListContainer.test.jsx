import React from 'react';
import { shallow, mount } from 'enzyme';
import CharacterListContainer from '../../../src/client/components/CharacterListContainer';
import CharacterList from '../../../src/client/components/CharacterList';

describe('CharacterListContainer', () => {
  it('should render a <CharacterList>', () => {
    const container = shallow(
      <CharacterListContainer />
    );
    expect(container.exists(CharacterList)).toBe(true);
  });

 });
