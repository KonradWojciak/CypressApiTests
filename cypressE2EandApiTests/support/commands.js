Cypress.Commands.add("login", (username, password) => {
  cy.get("#signin_button").click();
  cy.get("#user_login").type(username);
  cy.get("#user_password").type(password);
  cy.get(".btn-primary").click();
});
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

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