class HomePage {
  getMainMenuButton() {
    return cypress.get(".css-1jphuq5");
  }

  getFoundLogOutButton() {
    return cy.get(".css-7afvtf");
  }

  getClickLogOutButton() {
    return cy.get(":nth-child(9) > .css-bve2vl");
  }
}
export default HomePage;
