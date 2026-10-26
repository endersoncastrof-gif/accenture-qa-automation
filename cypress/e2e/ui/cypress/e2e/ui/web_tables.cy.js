describe('Desafio de QA Automation - Web Tables', () => {

  it('Deve criar, editar e deletar um registro na tabela', () => {
    // Passo 1: Acessar a página de Web Tables
    cy.visit('https://demoqa.com/webtables');

    // Passo 2: Criar um novo registro clicando no botão Add
    cy.get('#addNewRecordButton').click();

    // Preencher o formulário do modal
    cy.get('#firstName').type('Tony');
    cy.get('#lastName').type('Stark');
    cy.get('#userEmail').type('tony.stark@accenture.com');
    cy.get('#age').type('45');
    cy.get('#salary').type('15000');
    cy.get('#department').type('Engineering');
    cy.get('#submit').click();

    // Passo 3: Editar o registro criado (buscando pelo nome Tony)
    cy.get('#edit-record-4').click(); // Ou o ID correspondente ao novo registro
    cy.get('#age').clear().type('46');
    cy.get('#submit').click();

    // Passo 4: Deletar o registro criado
    cy.get('#delete-record-4').click();
  });

});
