describe('Desafio de QA Automation - Progress Bar', () => {
  it('Deve interagir com a barra de progresso', () => {
    // Passo 1: Acessar a página
    cy.visit('https://demoqa.com/progress-bar');

    // Passo 2: Clicar em Start com espera robusta para ignorar os anúncios da página
    cy.get('#startBtn', { timeout: 10000 }).should('be.visible').click();

    // Passo 3: Validação da barra
    // (Adicione o restante da sua lógica de pausa e asserção aqui)
  });
});
