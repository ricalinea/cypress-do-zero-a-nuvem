describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação.', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Curso Cypress do Zero a Nuvem', 2)

    cy.get('#firstName').type('Ricalinea')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('ricalinia@hotmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })


  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Curso Cypress do Zero a Nuvem', 20)

    cy.get('#firstName').type('Ricalinea')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('ricalinia@hotmail,com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')

  })

  it('campo telefone continua vazio quando preenchido com um valor não-numéridoe', () =>  {
    cy.get('#phone')
      .type('abcdef')
      .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Ricalinea')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('ricalinia@hotmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Ricalinea')
      .should('have.value', 'Ricalinea')
      .clear()
      .should('have.value', '')
      cy.get('#lastName')
      .type('Nascimento')
      .should('have.value', 'Nascimento')
      .clear()
      .should('have.value', '')
      cy.get('#email')
      .type('ricalinia@hotmail,com')
      .should('have.value', 'ricalinia@hotmail,com')
      .clear()
      .should('have.value', '')
      cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')

  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
  
  cy.get('.error > strong').should('be.visible')

  })

  it('envia o formuário com sucesso usando um comando customizado', ()  => {
    const data = {
      firstName: 'Ana',
      lastName: 'Silva',
      email: 'ana.cac-tat@gmail.com',
      text: 'Teste teste teste teste teste.'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por texto', () => {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
     cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')  

  })
})