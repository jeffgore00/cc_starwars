// --------0. Doesn’t display the font correctly.
// ADD: 
it('should render with the correct styling', () => {
  const component = mount(<CharacterListPage />);
  const element = component.getDOMNode();
  expect(element.getAttribute('id')).toEqual('entire-page-wrapper');
});

// --------1. Doesn’t display the characters
// ADD:
it('should pass along the character data it receives to the character list', () => {
  const container = mount(<CharacterListPage characters={['Obi', 'Luke']} {...requiredProps} />);
  const list = container.find(CharacterList)
  expect(container.props().characters).toBe(list.props().characters)
})

// --------2. Doesn’t respond to an onClick (I. No cursor)
// REPLACE in <CharacterCard>
it('should have a click handler that handles character selection when called', () => {
  const card = shallow(<CharacterCard key="1" name="Emperor Palpatine" onClick={onClickMock} />);
  card.simulate('click')
  expect(handleCharacterSelect).toHaveBeenCalled();
});

// --------3. Doesn’t respond to an onClick (II. No good response)
