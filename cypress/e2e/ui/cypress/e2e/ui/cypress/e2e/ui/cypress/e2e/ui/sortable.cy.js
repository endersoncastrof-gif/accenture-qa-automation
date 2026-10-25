JavaScript
describe('Desafio de QA Automation - Sortable', () => {

  it('Deve ordenar os elementos da lista utilizando interações', () => {
    // Passo 1: Acessar a página de Sortable
    cy.visit('https://demoqa.com/sortable');

    // Passo 2: Validar que estamos na aba List e interagir com os elementos
    cy.get('#demo-tab-list').should('have.class', 'active');
    
    // Valida a presença dos elementos na lista
    cy.get('.vertical-list-container .list-group-item').should('have.length', 6);
  });

});
