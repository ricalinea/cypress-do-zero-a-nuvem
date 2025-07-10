describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação.', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    const longText = Cypress._.repeat('Curso Cypress do Zero a Nuvem', 2)

    cy.get('#firstName').type('Ricalinea')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('ricalinia@hotmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')


    //Os comandos clock() e tick() são usados para controlar o tempo no Cypress.
    //O comando clock() é usado para "congelar" o tempo, ou seja, para que o Cypress não avance o tempo automaticamente.
    //O comando tick() é usado para avançar o tempo congelado, ou seja, para simular a passagem do tempo em testes que dependem de temporizadores ou delays.   
  })


  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    const longText = Cypress._.repeat('Curso Cypress do Zero a Nuvem', 20)

    cy.get('#firstName').type('Ricalinea')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('ricalinia@hotmail,com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')

    cy.tick(3000)

    cy.get('.error > strong').should('not.be.visible')

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
    cy.clock()

    cy.contains('button', 'Enviar').click()
  
  cy.get('.error > strong').should('be.visible')

    cy.tick(3000)

    cy.get('.error > strong').should('not.be.visible')

  })

  it('envia o formuário com sucesso usando um comando customizado', ()  => {
    cy.clock()

    const data = {
      firstName: 'Ana',
      lastName: 'Silva',
      email: 'ana.cac-tat@gmail.com',
      text: 'Teste teste teste teste teste.'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
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

    it('exibe e oculta as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
      cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
    })

    //Os comandos Hide() e Show() são usados para ocultar e exibir elementos na página, respectivamente.
    //O comando Invoke() é usado para chamar um método de um objeto jQuery, neste caso, os métodos show() e hide().
    //O comando Should() é usado para fazer asserções sobre o estado dos elementos na página.
    //O comando Contain() é usado para verificar se o elemento contém um texto específico.
    //O comando And() é usado para encadear múltiplas asserções em um único comando.

    it('preenche o campo da area de texto usando o comando invoke', () => {
      cy.get('#open-text-area')
        .invoke('val', 'Texto de teste')
        .should('have.value', 'Texto de teste')
    })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it('exibe o gato escondido', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu amo gatos')
  })
})