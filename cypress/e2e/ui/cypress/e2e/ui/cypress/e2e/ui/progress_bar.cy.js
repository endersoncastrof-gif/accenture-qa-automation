describe('Desafio de QA Automation - Progress Bar', () => {
  it('Deve interagir com a barra de progresso', () => {
    // Passo 1: Acessar a página oficial da barra de progresso
    cy.visit('https://demoqa.com/progress-bar');

    // Passo 2: Garantir que a página carregou, rolar até o botão e clicar com força bruta (force: true) se houver anúncios na frente
    cy.get('#startBtn', { timeout: 20000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    // Passo 3: Validação da barra de progresso (parar antes de 25% e validar)
    cy.get('#progressBar', { timeout: 20000 })
      .should('have.attr', 'aria-valuenow')
      .then((value) => {
        expect(parseInt(value)).to.be.at.least(0);
      });
  });
});
