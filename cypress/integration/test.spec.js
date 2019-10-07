describe('main page', () => {
  it('clicks', () => {
    cy.visit('http://localhost:1337')
      .get(':nth-child(1) > .ui')
      .click()
      .get('#film-character-name')
      .should('have.text', 'luke skywalker');
  });
});
