describe('Desafio de QA Automation - Progress Bar', () => {
  it('Deve interagir com a barra de progresso', () => {
    // Passo 1: Bloquear requisições de anúncios pesados da DemoQA para estabilizar o carregamento
    cy.intercept('GET', '**/ads?**', { statusCode: 204 }).as('ads');
    cy.intercept('GET', '**googlesyndication**', { statusCode: 204 }).as('googleAds');

    // Passo 2: Acessar a página
    cy.visit('https://demoqa.com/progress-bar');

    // Passo 3: Clicar em Start com tratamento de scroll e visibilidade robusta
    cy.get('#startBtn', { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .click();

    // Passo 4: Pausar antes de 25% e validar
    // (Insira aqui a sua lógica de verificação da barra, ex: cy.get('#progressBar').should(...))
  });
});
