describe('Meal Suggestion App', () => {
    beforeEach(() => {
        cy.visit('https://meal-suggestion.s3.eu-central-1.amazonaws.com/index.html');
    });
  
    it('Should load the page correctly and display the main elements', () => {
      cy.contains('h1', 'Refeição vegana 🌱').should('be.visible');
      cy.contains('label', 'Tipo:').should('be.visible');
      cy.get('#meal-type-filter').should('be.visible');
      cy.contains('label', 'Busca:').should('be.visible');
      cy.get('#search-field').should('be.visible');
      cy.contains('button', 'Buscar').should('be.visible');
      cy.get('#meal-container').should('be.visible');
    });
  
    it('Should generate a meal suggestion when loading the page', () => {
      cy.get('#meal-container')
        .as('mealContainer')
        .find('#meal-name')
        .should('be.visible')
        .and('not.be.empty');
      cy.get('@mealContainer')
        .find('#ingredients-label')
        .should('be.visible');
      cy.get('@mealContainer')
        .find('#ingredients-list li')
        .should('have.length.at.least', 1);
    });
  
    it('Should allow filtering meals by type', () => {
      cy.get('#meal-type-filter').select('Alto teor de proteína');
      cy.contains('button', 'Buscar').click();
      cy.get('#meal-container').should('be.visible');
    });
  
    it('Should allow searching for a meal', () => {
      cy.get('#search-field').type('Arroz');
      cy.contains('button', 'Buscar').click();
      cy.get('#meal-container')
      .find('#meal-name')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.toLowerCase()).to.include('arroz');
      });
    });
  });
  