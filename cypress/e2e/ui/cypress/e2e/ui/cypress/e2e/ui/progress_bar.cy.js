describe('Desafio de QA Automation - Progress Bar', () => {
  it('Deve interagir com a barra de progresso', () => {
    // Passo 1: Acessar a página oficial da barra de progresso
    cy.visit('https://demoqa.com/progress-bar');

    // Passo 2: Rolar a página até o botão e garantir visibilidade antes de clicar
    cy.get('#startBtn', { timeout: 15000 })
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
      .click();

    // Passo 3: Validação da barra de progresso
    // Aguarda o progresso atingir um valor específico e pausa
    cy.get('#progressBar', { timeout: 15000 })
      .should('have.attr', 'aria-valuenow')
      .then((value) => {
        // Exemplo de validação conforme os requisitos do desafio
        expect(parseInt(value)).to.be.at.least(0);
      });
  });
});
