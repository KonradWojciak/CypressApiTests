describe("Nasz pierwszy blok testów", () => {
  it("Test z wizytą w siedzibie LMS", () => {
    // cypress code
    cy.visit("https://www.edu.goit.global/account/login");

    cy.get("#user_email").click();
    cy.get("#user_email").type("user888@gmail.com");
    cy.get("#user_password").type("1234567890");
    cy.get(".css-1jphuq5").click();
    cy.get(".css-7afvtf").click();
    cy.get(":nth-child(9) > .css-bve2vl").click();
  });
});

// zamkniecie subscribe cy.get(".css-nsuwo3).click();
