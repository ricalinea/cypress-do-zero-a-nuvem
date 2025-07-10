Cypress._.times(3, () => {
  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
})

//A funçao Cypress._.times() executa o teste 3 vezes, mas não é necessário repetir o teste várias vezes.
//A função serve para demonstrar que o teste pode ser executado de forma independente, sem depender de outros testes.
//A função Cypress._.times() é uma função do Lodash, que é uma biblioteca de utilitários JavaScript que o Cypress usa internamente.
// Ela permite executar uma função um número específico de vezes, o que é útil para testes que precisam ser repetidos várias vezes.
