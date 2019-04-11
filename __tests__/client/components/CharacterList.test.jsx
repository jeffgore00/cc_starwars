import React from 'react';
import { shallow } from 'enzyme';
import CharacterList from '../../../src/client/components/CharacterList';
import CharacterCard from '../../../src/client/components/CharacterCard';
import Loading from '../../../src/client/components/Loading';
import ErrorMessage from '../../../src/client/components/ErrorMessage';

const handleCharacterSelectMock = jest.fn();
const handleCharacterDeselectMock = jest.fn();

const requiredProps = {
  handleCharacterSelect: handleCharacterSelectMock,
  handleCharacterDeselect: handleCharacterDeselectMock
};

describe('CharacterList ', () => {
  it('should render a <Loading> spinner if selectedCharacter is true and no error exists', () => {
    const list = shallow(
      <CharacterList
        characters={[{ id: 1, name: 'Obi Wan Kenobi' }]}
        selectedCharacter={{ id: 1, name: 'Obi Wan Kenobi' }}
        {...requiredProps}
      />
    );
    expect(list.exists(Loading)).toBe(true);
  });

  it('should not render a loader if selectedCharacter is false and no error exists', () => {
    const list = shallow(
      <CharacterList characters={[{ id: 1, name: 'Obi Wan Kenobi' }]} {...requiredProps} />
    );
    expect(list.exists(Loading)).toBe(false);
  });

  it('should not render CharacterCard components if characters prop is falsy', () => {
    const list = shallow(<CharacterList {...requiredProps} />);
    expect(list.exists(CharacterCard)).toBe(false);
  });

  it('should render an ErrorMessage if a character has been selected and there is an error', () => {
    const list = shallow(
      <CharacterList
        selectedCharacter={{ id: 1, name: 'Obi Wan Kenobi' }}
        error='load failure'
        {...requiredProps}
      />
    );
    expect(list.exists(ErrorMessage)).toBe(true);
  });

  it('should pass the CharacterCard an onClick handler which, when the card is clicked, calls the handleCharacterSelect handler', () => {
    const handleCharacterSelect = jest.fn();
    const list = shallow(
      <CharacterList
        handleCharacterSelect={handleCharacterSelect}
        handleCharacterDeselect={handleCharacterDeselectMock}
        characters={[{ id: 1, name: 'Obi Wan Kenobi' }, { id: 2, name: 'Luke Skywalker' }]}
      />
    );
    const card = list.find(CharacterCard).first();
    card.props().onClick();
    expect(handleCharacterSelect).toHaveBeenCalled();
  });

  it('should pass the ErrorMessage an execRollbackActions handler which, when the card is clicked, calls the handleCharacterDeselect handler', () => {
    const handleCharacterDeselect = jest.fn();
    const list = shallow(
      <CharacterList
        selectedCharacter={{ id: 1, name: 'Obi Wan Kenobi' }}
        error='load failure'
        handleCharacterDeselect={handleCharacterDeselect}
        handleCharacterSelect={handleCharacterSelectMock}
      />
    );
    const errorMessage = list.find(ErrorMessage).first();
    errorMessage.props().execRollbackActions();
    expect(handleCharacterDeselect).toHaveBeenCalled();
  });
});
