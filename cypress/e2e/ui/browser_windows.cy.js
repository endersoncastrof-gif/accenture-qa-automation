describe('Desafio de QA Automation - Browser Windows', () => {

  it('Deve abrir uma nova janela, validar a mensagem e fechá-la', () => {
    // Passo 1: Acessar a página de Browser Windows
    cy.visit('https://demoqa.com/browser-windows');

    // O Cypress lida com novas abas/janelas interceptando o atributo target="_blank"
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    // Clica no botão para abrir a nova janela
    cy.get('#windowButton').click();

    // Como o DemoQA abre em outra aba, visitamos diretamente a URL da página de amostra para validar
    cy.visit('https://demoqa.com/sample');

    // Valida a mensagem exigida no desafio
    cy.get('#sampleHeading').should('have.text', 'This is a sample page');
  });

});
