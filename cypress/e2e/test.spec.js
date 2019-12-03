describe('main page', () => {

  /* standard version */
  it('clicks', () => {
    cy.visit('/')
      .get(':nth-child(1) > .ui')
      .click()
      .get('#film-character-name')
      .should('have.text', 'luke skywalker');
  });

  /* with @testing-library/cypress */
  it('clicks', () => {
    cy.visit('/')
      .queryByText('Luke Skywalker')
      .click()
      .get('#film-character-name')
      .should('have.text', 'luke skywalker');
  });
});
