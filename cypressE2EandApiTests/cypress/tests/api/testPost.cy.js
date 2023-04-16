it("correct work with POST", () => {
  // Step 1: send GET request to endpoint
  cy.request({
    method: "POST",
    url: "http://localhost:8080/cars",
    body: {
      manufacturer: "Audi",
      model: "A3",
    },
    failOnStatusCode: false,
  }).as("details");

  cy.log("Request was sent");

  // Step 2 assert that the  status code is 200
  cy.get("details").its("status").should("eq", 200);

  cy.log("Request status is corect");

  // Step 3: assert that the response body is not empty
  cy.get("@details").its("body").should("not.be.empty");
  cy.log("Body is not empty.");

  // Step 4: assert that the body includes new elements
  cy.get("@details").then((response) => {
    cy.wrap(JSON.stringify(response.body))
      .should("include", "Audi")
      .should("include", "A3");
  });
});
