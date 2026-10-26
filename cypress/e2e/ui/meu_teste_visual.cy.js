describe('Desafio de QA Automation - Testes Visuais e de UI', () => {

  beforeEach(() => {
    // Acessa a página de exemplo para validação visual
    cy.visit('https://example.cypress.io');
  });

  it('Deve validar a presença e visibilidade dos elementos visuais principais', () => {
    // Valida se o título principal está visível na tela
    cy.get('h1').should('be.visible').and('contain', 'Kitchen Sink');

    // Valida se um elemento da barra de navegação está visível
    cy.get('.navbar-brand').should('be.visible');
  });

  it('Deve interagir com elementos visuais e validar o resultado', () => {
    // Clica em um link de exemplo na interface
    cy.contains('type').click();

    // Digita em um campo de input e valida se o valor foi preenchido corretamente
    cy.get('#email1')
      .type('senhor.stark@accenture.com')
      .should('have.value', 'senhor.stark@accenture.com');
  });

});
