describe('Desafio de QA Automation - Fluxo de API da DemoQA', () => {
  
  let username;
  let password = 'SenhaForte@123!';
  let userId;
  let token;
  let isbnLivros = [];

  beforeEach(() => {
    username = `stark_qa_${Date.now()}`;
  });

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
      return cy.request({
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
      return cy.request({
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
      
      // Passo 4: Listar os livros disponíveis e garantir captura segura dos ISBNs
      return cy.request({
        method: 'GET',
        url: 'https://demoqa.com/BookStore/v1/Books',
      }).then((response) => {
        expect(response.status).to.eq(200);
        // Validamos se os livros retornaram em forma de array (seja books ou diretamente no body)
        const booksList = response.body.books || response.body;
        expect(booksList.length).to.be.greaterThan(1);
        isbnLivros.push(booksList[0].isbn);
        isbnLivros.push(booksList[1].isbn);
      });

    }).then(() => {
      
      // Passo 5: Alugar dois livros escolhidos com tratamento de chave correto
      return cy.request({
        method: 'POST',
        url: 'https://demoqa.com/BookStore/v1/Books',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          userId: userId,
          collectionOfIsbns: [ // Nota: Alguns ambientes da DemoQA utilizam collectionOfIsbns em vez de collectionByIsbn
            { isbn: isbnLivros[0] },
            { isbn: isbnLivros[1] }
          ]
        },
        failOnStatusCode: false // Evita quebra se o servidor instável da DemoQA oscilar
      }).then((response) => {
        // Aceitamos tanto 201 quanto 200 caso o servidor responda diferente por instabilidad temporal
        expect([200, 201]).to.include(response.status);
      });

    }).then(() => {
      
      // Passo 6: Listar os detalhes do usuário com os livros reservados
      return cy.request({
        method: 'GET',
        url: `https://demoqa.com/Account/v1/User/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.username).to.eq(username);
        expect(response.body.books).to.be.an('array');
      });

    });

  });

});
