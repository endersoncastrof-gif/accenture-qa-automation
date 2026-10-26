describe('Desafio de QA Automation - Frontend (Practice Form)', () => {

  it('Parte 2: Preencher o Practice Form, fazer upload de arquivo e validar popup', () => {
    // Acessa o formulário da DemoQA
    cy.visit('https://demoqa.com/automation-practice-form');

    // Preenche com valores aleatórios
    cy.get('#firstName').type('Tony');
    cy.get('#lastName').type('Stark');
    cy.get('#userEmail').type('tony.stark@accenture.com');
    cy.get('label[for="gender-radio-1"]').click(); // Male
    cy.get('#userNumber').type('11988887777');

    // Realiza o upload do ficheiro .txt localizado no repositório
    cy.get('#uploadPicture').selectFile('cypress/fixtures/arquivo_teste.txt');

    cy.get('#currentAddress').type('Zona Sur, Sao Paulo');

    // Submete o formulário
    cy.get('#submit').scrollIntoView().click();

    // Valida que o pop-up de confirmação foi aberto
    cy.get('.modal-content').should('be.visible');
    cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form');

    // Fecha o pop-up
    cy.get('#closeLargeModal').scrollIntoView().click();
    cy.get('.modal-content').should('not.exist');
  });

});
