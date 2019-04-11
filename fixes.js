// --------0. Doesn’t display the font correctly.
it('should render with the correct styling', () => {
    const component = mount(<CharacterListPage />);
    const element = component.getDOMNode()
    expect(element.getAttribute('id')).toEqual('entire-page-wrapper')
  })


// --------1. Doesn’t display the characters



// --------2. Doesn’t respond to an onClick (I. No cursor)


// --------3. Doesn’t respond to an onClick (II. No good response)