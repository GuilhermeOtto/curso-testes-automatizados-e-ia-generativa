describe('Meal Suggestion App', () => {
  beforeEach(() => {
    cy.visit('https://meal-suggestion.s3.eu-central-1.amazonaws.com/index.html');
  });

  it('Should load the page correctly and display the main elements', () => {
    cy.contains('h1', 'Refeição vegana 🌱').should('be.visible');
    cy.contains('label', 'Tipo:').should('be.visible');
    cy.get('#meal-type-filter').should('be.visible');
    cy.contains('label', 'Busca:').should('be.visible');
    cy.get('input[placeholder="Ex: Arroz e feijão"]').should('be.visible')
    cy.contains('button', 'Buscar').should('be.visible');
    cy.get('#meal-container').should('be.visible')
  });

  it('Should generate a meal suggestion when loading the page', () => {
    cy.get('#meal-container')
      .as('mealContainer')
      .find('#meal-name')
      .should('be.visible')
    cy.get('@mealContainer')
      .find('#ingredients-label')
      .should('be.visible')
    cy.get('@mealContainer')
      .find('#ingredients-list')
      .should('be.visible')
  });
});