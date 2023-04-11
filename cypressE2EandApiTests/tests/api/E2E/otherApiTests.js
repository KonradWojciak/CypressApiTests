/// check PUT method

describe("Test for POST method ", () => {
  it("should change the name of an element", () => {
    // Step 1: send POST request to endpoint to create an element
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: "http://localhost:8080/cars",
      body: {
        "Nazwa elementu": "Stołek",
        "Szczegól elementu": "Zielony",
      },
    }).as("response");
    cy.log("POST request was sent");

    // Step 2: assert that the  status code is 200
    cy.get("@response").its("status").should("eq", 200);

    cy.log("POST request status is corect");

    // Step 3: assert that the response body is not empty
    cy.get("@response").its("body").should("not.be.empty");
    cy.log("POST response body is not empty");

    // Step 4: assert that the body includes new elements
    cy.get("@response").then((response) => {
      cy.wrap(JSON.stringify(response.body))
        .should("include", "Stołek")
        .should("include", "Zielony");
    });

    // Step 5: send PUT request to update element
    cy.get("@response").then((response) => {
      const elementId = response.body.id;
      cy.request({
        method: "PUT",
        failOnStatusCode: false,
        url: `http://localhost:8080/cars/${elementId}`,
        body: {
          "Nazwa elementu": "Krzesło",
        },
      }).as("putResponse");
      cy.log("PUT request was sent");
    });

    // Step 6: assert that the status code of PUT request is 200
    cy.get("@putResponse").its("status").should("eq", 200);
    cy.log("PUT request status is correct");

    // Step 7: assert that the response body is not empty
    cy.get("@putResponse").its("body").should("not.be.empty");
    cy.log("PUT response body is not empty");

    // Step 8: assert that the body includes the updated element name
    cy.get("@putResponse").then((response) => {
      cy.wrap(JSON.stringify(response.body)).should("include", "Krzesło");
      cy.log("PUT request works correct");
    });
  });
});
