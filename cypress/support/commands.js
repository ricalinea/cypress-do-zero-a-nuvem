Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    const longText = Cypress._.repeat('Curso Cypress do Zero a Nuvem', 20)

    cy.get('#firstName').type('Ricalinea')
    cy.get('#lastName').type('Nascimento')
    cy.get('#email').type('ricalinia@hotmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('.button[type="submit"]').click()

})