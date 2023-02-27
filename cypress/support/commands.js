// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('LaunchApplication', () => { 
    
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/#')

})

Cypress.Commands.add('SelectCountry', (countryName)=> {
    cy.get('input#autocomplete').type(countryName)
    cy.wait(1000)
    cy.get('ul#ui-id-1 li').each(($ele, index, $list) => {
        if($ele.text() == countryName)
        cy.wrap($ele).click({force: true})
    })
})