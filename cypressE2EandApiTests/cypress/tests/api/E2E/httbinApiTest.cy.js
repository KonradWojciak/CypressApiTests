describe("Mod4 httpbin.org Api Tests", () => {
  /// Key value Test
  it("Key value Test response code should be 200", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: "https://httpbin.org/get",
      qs: {
        key: "value",
      },
    }).as("details");
    cy.log("Request was sent");
    // Step 2: assert that the status code is 200
    cy.get("@details").its("status").should("eq", 200);
    cy.log("Request status is correct");
    // Step 3: assert correct key value
    cy.get("@details").its("body.args.key").should("eq", "value");
    cy.log("Body has correct key value");
  });
  // GET correct work   Tests
  it("correct work with method GET", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "GET",
      url: "https://httpbin.org/get",
      failOnStatusCode: false,
    }).as("details");
    cy.log("Request was sent");
    // Step 2 assert that the status code is 200
    cy.get("@details").its("status").should("eq", 200);
    cy.log("Request status is corect");
    // Step 3: assert that the response body is not empty
    cy.get("@details").its("body").should("not.be.empty");
    cy.log("Body is not empty.");
    // Step 4: assert that the response body is corect
    cy.get("@details").then((response) => {
      cy.log("Response was: " + JSON.stringify(response.body));
    });
  });
  // GET DURETION tests
  it("should return request duration", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "GET",
      url: "https://httpbin.org/duretion",
    }).as("details");
    cy.log("Request was sent");
    // Step 2: assert that the status code is 200
    cy.get("@details").its("status").should("eq", 200);
    cy.log("Request status is correct");
    // Step 3: assert that the response body is not empty
    cy.get("@details").its("body").should("not.be.empty");
    cy.log("Response body is not empty");
    // Step 4: assert that the response body has a duration property
    cy.get("@details").its("body").should("have.property", "duration");
    cy.log("Response body has duration property");
    // Step 5: assert that the duration is a number
    cy.get("@details").its("body.duration").should("be.a", "number");
    cy.log("Duration is a number");
    // Step 6: log the duration value
    cy.get("@details").then((response) => {
      const duration = response.body.duration;
      cy.log(`The duration value is ${duration}`);
    });
  });
  // maximum long duretion Time test
  it("should return response in less than 5000ms", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "GET",
      url: "https://httpbin.org/duretion",
    }).then((response) => {
      // Step 2 assert that the  status code is 200
      expect(response.status).to.eq(200);
      cy.log("Request was sent");
      // Step 3: assert that the response body is not empty
      expect(response.body).to.not.be.empty;
      cy.log("Body is not empty");
      // Step 4: assert that the response duretion is less then 500 ms
      expect(response.duration).to.be.lessThan(500);
      cy.log("Response duretion is less then 500 ms");
    });
  });
  /// POST  hard data work test
  it("correct work with POST", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "POST",
      url: "https://httpbin.org/post/anything",
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
  it("correct POST with random data", () => {
    //SET UP
    //Generate random data
    const randomName = Math.random().toString(36).substring(7);
    const randomModel = Math.random().toString(36).substring(7);
    // Step 1 send POST request to endpoint with random data
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: "https://httpbin.org/post/anything",
      body: {
        "Nazwa elementu": randomName,
        "Szczegół elementu": randomModel,
      },
    }).as("details");
    cy.log("Request was sent");
    // Step 2 assert that the status code is 200
    cy.get("@details").its("status").should("eq", 200);
    cy.log("Request status is correct");
    // Step 3 assert that the response body is not empty
    cy.get("@details").its("body").should("not.be.empty");
    cy.log("Response body is not empty");
    // Step 4 assert that the response body includes new elements
    cy.get("@details").then((response) => {
      cy.wrap(JSON.stringify(response.body))
        .should("include", randomName)
        .should("include", randomModel);
    });
    cy.log("New elements includes in the response body");
  });
  /// POST  WRONG END POINT
  it("Test for POST on wrong endpoint should return 405", () => {
    // Step 1: send POST request to wrong endpoint
    cy.request({
      method: "GET",
      url: "https://httpbin.org/non-existing-url",
      failOnStatusCode: false,
    }).as("details");
    cy.log("Request with wrong method was sent");
    // Step 2: assert that the status code is 405
    cy.get("@details").its("status").should("eq", 405);
    cy.log("Correct status 405 after wrong request");
  });
  /// check PUT method
  it("should change the name of an element", () => {
    // Step 1: send POST request to endpoint to create an element
    cy.request({
      method: "PUT",
      failOnStatusCode: false,
      url: "https://httpbin.org/put/anything",
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
        url: `https://httpbin.org/put/anything${elementId}`,
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
/// DELETE work tests
it("corect work with DELETE method  with new Body Data ", () => {
  let id;
  //SET-UP
  // Step 1 send GET request to endpoint
  cy.request({
    method: "POST",
    url: "https://httpbin.org/post/anything",
    body: {
      manufacturer: "Volvo",
      model: "XC60",
    },
    failOnStatusCode: false,
  }).as("testData");
  cy.log("POST request was sent correctly");
  // Step 2 assert that the  status code is 200
  cy.get("@testData").its("status").should("eq", 200);
  cy.log("New Body Data was sent ");
  // Step 3 assert id for new body element
  cy.get("@testData").then((response) => {
    const id = response.body.length;
    cy.log("New element was created with id =" + id);
    Cypress.env("id", id);
  });
  cy.log("Delete Set UP Data created correctly.");
  // DELATEING
  // Step 5 assert Id for cypress enviroment
  cy.then(() => {
    const id = Cypress.env("id");
    // Step 6  send delete request to endpoint
    cy.request({
      method: "DELETE",
      failOnStatusCode: false,
      url: `https://httpbin.org/delete/anything${id}`,
    }).as("details");
    // Step 7  assert that the status code of delete is 200
    cy.get("@details").its("status").should("eq", 200);
    cy.log("Delete request was sent");
    // Step 8 check for body is not include new element
    cy.get("@details").then((response) => {
      cy.wrap(JSON.stringify(response.body))
        .should("not.include", "Volvo")
        .should("not.include", "XC60");
      cy.log("Del Test Data succesfull.");
    });
  });
});
///COOKIE send test
it("test send cookie", () => {
  // Step 1 send request to endpoint
  cy.request({
    method: "GET",
    url: "https://httpbin.org/headers",
    headers: {
      Cookie: "cookieName=cookieValue",
    },
    failOnStatusCode: false,
  }).as("details");
  cy.log("Request with cookies was sent");
  //Step 2 assert that the  status code is 200
  cy.get("@details").its("status").should("eq", 200);
  cy.log("Status code of request is correct");
  cy.get("@details").then((response) => {
    assert.equal("cookieName=cookieValue", response.requestHeaders["Cookie"]);
    cy.log("Cookies send work correct");
  });
});
