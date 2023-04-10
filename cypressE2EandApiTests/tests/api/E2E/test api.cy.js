// Key value Test
describe("Key value Test", () => {
  const request = {
    url: "https://httpbin.org/get",
    qs: {
      key: "value",
    },
    failOnStatusCode: false,
  };

  it("response code should be 200", () => {
    // Step 1: send GET request to endpoint
    cy.request(request).as("response");
    cy.log("Request was sent");

    // Step 2: assert that the status code is 200
    cy.get("@response").its("status").should("eq", 200);
    cy.log("Request status is correct");

    // Step 3: assert correct key value
    cy.get("@response").its("body.args.key").should("eq", "value");
    cy.log("Body has correct key value");
  });
});

/// GET work   Tests
describe("Test method  GET", () => {
  it("corect work with method  GET", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "GET",
      failOnStatusCode: false,
      url: "http://localhost:8080/cars",
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
});

// GET DURETION tests

describe("Test for request duration", () => {
  it("should return request duration", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "GET",
      url: "http://localhost:8080/duration",
    }).as("response");

    cy.log("Request was sent");

    // Step 2: assert that the status code is 200
    cy.get("@response").its("status").should("eq", 200);

    cy.log("Request status is correct");

    // Step 3: assert that the response body is not empty
    cy.get("@response").its("body").should("not.be.empty");

    cy.log("Response body is not empty");

    // Step 4: assert that the response body has a duration property
    cy.get("@response").its("body").should("have.property", "duration");

    cy.log("Response body has duration property");

    // Step 5: assert that the duration is a number
    cy.get("@response").its("body.duration").should("be.a", "number");

    cy.log("Duration is a number");
  });
  // Step 6: log the duration value
  cy.get("@response").then((response) => {
    const duration = response.body.duration;
    cy.log(`The duration value is ${duration}`);
  });
});

describe("Test for GET time request duration", () => {
  it("should return response in less than 500ms", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "GET",
      url: "http://localhost:8080/cars",
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
});

///   POST  work tests
describe("Test for POST method ", () => {
  it("corect work with POST", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: "http://localhost:8080/cars",
      body: {
        // warto randomizowac te dane
        "Nazwa elementu": "Stołek",
        "Szczegól elementu": "Zileony",
      },
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
        .should("include", "Stołek")
        .should("include", "Zielony");
    });
  });
});
//////////////   DELETE
describe("Test for DELETE  method ", () => {
  it("corect work with Delete Body Data ", () => {
    let id;

    //SET-UP
    // Step 1: send GET request to endpoint
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: "http://localhost:8080/cars",
      body: {
        "Nazwa elementu": "Stołek",
        "Szczegól elementu": "Zileony",
      },
    }).as("testData");
    // Step 2 assert that the  status code is 200
    cy.get("@testData").its("status").should("eq", 200);
    // Step 3: assert id for new body element
    cy.get("@testData").then((response) => {
      const id = response.body.length;
      cy.log("New element was created with id =" + id);
      Cypress.env("id", id);
    });

    cy.log("Delete  Test Data created correctly.");
  });

  // DELATEING
  // Step 5 assert Id for cypress enviroment

  cy.then(() => {
    const id = Cypress.env("id");
    // Step 6  send delete request to endpoint
    cy.request({
      method: "DELETE",
      failOnStatusCode: false,
      url: `http://localhost:8080/cars${id}`,
    }).as("@details");
    // Step 7  assert that the status code of delete is 200
    cy.get("@details").its("status").should("eq", 200);
    cy.log("Delete request was sent");

    // Step 8 check for body is not include new element

    cy.get("@details").then((response) => {
      cy.wrap(JSON.stringify(response.body))
        .should("not.include", "Stołek")
        .should("not.include", "Zielony");

      cy.log("Del Test Data succesfull.");
    });
  });

  /// POST  WRONG END POINT

  describe("Test for POST on wrong endpoint", () => {
    it("should return 405 for POST method", () => {
      // Step 1: send POST request to wrong endpoint
      cy.request({
        method: "GET",
        url: "http://localhost:8080/cars",
        failOnStatusCode: false,
      }).as("response");

      cy.log("Request with wrong method was sent");

      // Step 2: assert that the status code is 405
      cy.get("@response").its("status").should("eq", 405);

      cy.log("Correct status 405 after wrong request");
    });
  });
});

// TOTAL DURATINON hook
// After install mocha

// log the total test duration
//afterEach(() => {
//cy.window().then(win => {
//   const mocha = win.Mocha;
//   const totalDuration = mocha && mocha.getRunner() && mocha.getRunner().stats ? mocha.getRunner().stats.duration : 0;
//   cy.log(`Total test duration: ${totalDuration} ms`);
// });
//});
//});
