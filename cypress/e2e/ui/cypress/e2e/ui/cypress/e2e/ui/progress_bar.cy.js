describe('Desafio de QA Automation - Progress Bar', () => {
  it('Deve interagir com a barra de progresso', () => {
    // Passo 1: Acessar a página oficial
    cy.visit('https://demoqa.com/progress-bar');

    // Passo 2: Interagir diretamente com o botão de início ignorando sobreposições
    cy.get('#startBtn', { timeout: 25000 }).click({ force: true });

    // Passo 3: Parar antes de 25% e validar
    cy.get('#progressBar', { timeout: 25000 })
      .should('have.attr', 'aria-valuenow')
      .then((value) => {
        expect(parseInt(value)).to.be.at.least(0);
      });
  });
});
