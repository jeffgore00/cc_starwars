describe('main page', () => {
  it('clicks', () => {
    cy.visit('/')
      .get(':nth-child(1) > .ui')
      .click()
      .get('#film-character-name')
      .should('have.text', 'luke skywalker');
  });

  it('clicks', () => {
    cy.visit('/')
      .queryByText('luke skywalker')
      .click()
      .get('#film-character-name')
      .should('have.text', 'luke skywalker');
  });
});
