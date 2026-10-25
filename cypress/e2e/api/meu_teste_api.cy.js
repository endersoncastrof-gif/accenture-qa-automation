JavaScript
describe('Desafio de QA Automation - Testes de API', () => {
  
  it('Deve listar os itens com sucesso (GET)', () => {
    cy.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('title');
    });
  });

  it('Deve cadastrar um novo registro com sucesso (POST)', () => {
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      body: {
        title: 'Teste de Automação Accenture',
        body: 'Conteúdo do desafio técnico de QA',
        userId: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.title).to.eq('Teste de Automação Accenture');
    });
  });

});
