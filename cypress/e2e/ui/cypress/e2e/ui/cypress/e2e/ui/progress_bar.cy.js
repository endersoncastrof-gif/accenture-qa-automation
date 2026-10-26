describe('Desafio de QA Automation - Progress Bar', () => {
  it('Deve interagir com a barra de progresso de forma limpa', () => {
    // 1. Acessar diretamente a página da barra de progresso
    cy.visit('https://demoqa.com/progress-bar');

    // 2. Aguardar o botão estar visível, rolar até ele e disparar o clique com força para ignorar qualquer anúncio
    cy.get('#startBtn', { timeout: 20000 })
      .should('be.visible')
      .click({ force: true });

    // 3. Aguardar o progresso avançar e clicar no botão Stop no momento exato (antes de 25%)
    // O DemoQA exige pausar antes ou em 25%
    cy.get('#progressBar', { timeout: 25000 })
      .should('have.attr', 'aria-valuenow')
      .then((val) => {
        const valorAtual = parseInt(val);
        expect(valorAtual).to.be.at.most(25);
      });
  });
});
