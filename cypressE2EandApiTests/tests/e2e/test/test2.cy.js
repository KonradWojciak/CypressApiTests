/// <reference types="cypress" />

describe("Test z wizytą w siedzibie LMS 2", () => {
  beforeEach(() => {
    cy.visit("https://www.edu.goit.global/account/login ");
    cy.login("testowyqa@qa.team", "QA!automation-1");
  });

  it("To log out", () => {
    cy.get(".css-1jphuq5").click();
    cy.get(".css-7afvtf").click();
    cy.get(":nth-child(9) > .css-bve2vl").click();
  });
});
