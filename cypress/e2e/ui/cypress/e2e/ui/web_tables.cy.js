describe('Desafio de QA Automation - Web Tables', () => {
  it('Deve adicionar e editar um registro na tabela com sucesso', () => {
    // 1. Acessar a página de Web Tables
    cy.visit('https://demoqa.com/webtables');

    // 2. Clicar no botão de adicionar novo registro
    cy.get('#addNewRecordButton').click();

    // 3. Preencher o formulário
    cy.get('#firstName').type('Tony');
    cy.get('#lastName').type('Stark');
    cy.get('#userEmail').type('tony.stark@accenture.com');
    cy.get('#age').type('45');
    cy.get('#salary').type('15000');
    cy.get('#department').type('Engineering');

    // 4. Submeter o formulário
    cy.get('#submit').click();

    // 5. Rolar até o registro recém-criado, garantir visibilidade e editar com force: true
    cy.get('#edit-record-4', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    // 6. Validar que o modal de edição abriu alterando o nome
    cy.get('#firstName').should('have.value', 'Tony').clear().type('Anthony');
    cy.get('#submit').click();
  });
});
