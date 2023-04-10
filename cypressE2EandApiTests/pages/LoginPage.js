/// <reference types="cypress" />

class LoginPage {
  navigate() {
    return cy.visit("https://www.edu.goit.global/account/login ");
  }

  getloginInput() {
    return cy.get("#user_email");
  }

  getPasswordInput() {
    return cy.get("#user_password");
  }

  getLoginInButton() {
    return cy.get(".css-1jphuq5");
  }
}

export default LoginPage;
