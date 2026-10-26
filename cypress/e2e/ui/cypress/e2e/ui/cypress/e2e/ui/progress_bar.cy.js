describe('Desafio de QA Automation - Progress Bar', () => {

  it('Deve interagir com a barra de progresso, pausar antes de 25% e resetar nos 100%', () => {
    // Passo 1: Acessar a página de Progress Bar
    cy.visit('https://demoqa.com/progress-bar');

    // Passo 2: Clicar em Start
    cy.get('#startBtn').click();

    // Passo 3: Parar antes dos 25% e validar que o valor é menor ou igual a 25%
    // Como a barra é rápida, pausamos logo em seguida
    cy.wait(1500);
    cy.get('#startBtn').click(); // Pausa
    cy.get('#progressBar').should(($div) => {
      const valor = parseInt($div.text());
      expect(valor).to.be.at.most(25);
    });

    // Passo 4: Apertar Start novamente e ir até 100%
    cy.get('#startBtn').click();
    
    // Aguarda o progresso atingir 100% (o tempo limite padrão do Cypress lida bem com isso)
    cy.get('#progressBar', { timeout: 15000 }).should('have.text', '100%');

    // Passo 5: Resetar a progress bar
    cy.get('#resetButton').click();
    cy.get('#progressBar').should('have.text', '0%');
  });

});
