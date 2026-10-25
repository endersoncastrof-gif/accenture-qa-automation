JavaScript
describe('Desafio de QA Automation - Fluxo de API da DemoQA', () => {
  
  const username = `stark_qa_${Date.now()}`;
  const password = 'SenhaForte@123';
  let userId;
  let token;
  let isbnLivros = [];

  it('Deve executar o fluxo completo de ponta a ponta na API da DemoQA', () => {
    
    // Passo 1: Criar um usuário
    cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: {
        userName: username,
        password: password
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body.userID;
      expect(userId).to.not.be.empty;
    }).then(() => {
      
      // Passo 2: Gerar o Token de Acesso
      cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/GenerateToken',
        body: {
          userName: username,
          password: password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        token = response.body.token;
        expect(token).to.not.be.empty;
      });

    }).then(() => {
      
      // Passo 3: Confirmar se o usuário está autorizado
      cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/Authorized',
        body: {
          userName: username,
          password: password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.eq(true);
      });

    }).then(() => {
      
      // Passo 4: Listar os livros disponíveis
      cy.request({
        method: 'GET',
        url: 'https://demoqa.com/BookStore/v1/Books',
      }).then((response) => {
        expect(response.status).to.eq(200);
        isbnLivros.push(response.body.books[0].isbn);
        isbnLivros.push(response.body.books[1].isbn);
        expect(isbnLivros.length).to.eq(2);
      });

    }).then(() => {
      
      // Passo 5: Alugar dois livros escolhidos
      cy.request({
        method: 'POST',
        url: 'https://demoqa.com/BookStore/v1/Books',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          userId: userId,
          collectionByIsbn: [
            { isbn: isbnLivros[0] },
            { isbn: isbnLivros[1] }
          ]
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.books).to.have.length(2);
      });

    }).then(() => {
      
      // Passo 6: Listar os detalhes do usuário com os livros reservados
      cy.request({
        method: 'GET',
        url: `https://demoqa.com/Account/v1/User/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.username).to.eq(username);
        expect(response.body.books).to.have.length(2);
        expect(response.body.books[0].isbn).to.eq(isbnLivros[0]);
        expect(response.body.books[1].isbn).to.eq(isbnLivros[1]);
      });

    });

  });

});
