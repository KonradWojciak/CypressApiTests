describe("Mod 4 httpbin.org Api Tests", () => {
  /// Key value Test
  it(" GET Key value Test", () => {
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
  ///COOKIES send test
  it("Cookies send test ", () => {
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
    cy.get("@details").its("status");
    cy.log("Status code of request is correct");
    // Step 3 assert that cookies send work correct
    cy.get("@details").then((response) => {
      assert.equal("cookieName=cookieValue", response.requestHeaders["Cookie"]);
      cy.log("Cookies send work correct");
    });
  });
  /// HEADER set test
  it("Header set test ", () => {
    // Step 1 send request to endpoint
    cy.request({
      method: "GET",
      url: "https://httpbin.org/headers",
      headers: {
        customHeader: "customValue",
      },
      failOnStatusCode: false,
    }).as("details");
    //Step 2 assert that the  status code is 200
    cy.get("@details").its("status").should("eq", 200);
    cy.log("Status code of request is correct");
    // Step 3 assert that  hedder set work correct
    cy.get("@details").then((response) => {
      assert.equal("customValue", response.requestHeaders.customHeader);
      cy.log("Header set work correctly");
    });
  });
  ///USER-AGENT test set correctly
  it("User-Agent set test", () => {
    // Step 1 send request to endpoint
    cy.request({
      method: "GET",
      url: "https://httpbin.org/headers",
      headers: {
        "user-agent": "My test user-agent",
      },
      failOnStatusCode: false,
    }).as("details");
    //Step 2 assert that the  status code is 200
    cy.get("@details").its("status").should("eq", 200);
    cy.log("Status code of request is correct");
    cy.get("@details").then((response) => {
      // Step 3 assert that  hedder set work correct
      assert.equal("My test user-agent", response.requestHeaders["user-agent"]);
      cy.log("User Agent set work correctly");
    });
  });
  /// GET correct work   Test
  it("Correct work with method GET", () => {
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
  /// GET duration test
  it("Duration GET request test", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "GET",
      url: "https://httpbin.org/get",
    }).as("details");
    cy.log("Request was sent");
    // Step 2: assert that the status code is 200
    cy.get("@details").its("status").should("eq", 200);
    cy.log("Request status is correct");
    // Step 3: assert that the response body is not empty
    cy.get("@details").its("body").should("not.be.empty");
    cy.log("Response body is not empty");
    // Step 4: assert that the response body has a duration property
    cy.get("@details").should("have.property", "duration");
    cy.log("Response has duration property");
    // Step 5: assert that the duration is a number
    cy.get("@details").its("duration").should("be.a", "number");
    cy.log("Duration is a number");
    // Step 6: log the duration value
    cy.get("@details").then((response) => {
      const duration = response.duration;
      cy.log(`The duration value is ${duration}`);
    });
  });
  // Maximum long DURATION Time test
  it(" Duretion POST max difined time ", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "POST",
      url: "https://httpbin.org/post",
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
  it("Correct work with POST", () => {
    // Step 1: send GET request to endpoint
    cy.request({
      method: "POST",
      url: "https://httpbin.org/anything",
      body: {
        manufacturer: "Audi",
        model: "A3",
      },
      failOnStatusCode: false,
    }).as("details");
    cy.log("Request was sent");
    // Step 2 assert that the  status code is 200
    cy.get("@details").its("status").should("eq", 200);
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
  it("Correct POST with random data", () => {
    //SET UP
    //Generate random data
    const randomName = Math.random().toString(36).substring(7);
    const randomModel = Math.random().toString(36).substring(7);
    // Step 1 send POST request to endpoint with random data
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: "https://httpbin.org/post",
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
  /// POST  wrong end point test
  it("Test for POST on wrong endpoint", () => {
    // Step 1: send POST request to wrong endpoint
    cy.request({
      method: "GET",
      url: "https://httpbin.org/post",
      failOnStatusCode: false,
    }).as("details");
    cy.log("Request with wrong method was sent");
    // Step 2: assert that the status code is 405
    cy.get("@details").its("status").should("eq", 405);
    cy.log("Correct status 405 after wrong request");
  });
  /// Check PATCH method
  it("PATCH change the name of Body element", () => {
    // Step 1: send POST request to endpoint to create an element
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url: "https://httpbin.org/anything",
      body: {
        "Element Name": "Chair",
        "Element Details": "Green",
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
        .should("include", "Chair")
        .should("include", "Green");
    });
    cy.log("POST request was sent");
    // Step 5: send Patch request to update element
    cy.get("@response").then((response) => {
      const elementId = response.body.id;
      cy.request({
        method: "PATCH",
        failOnStatusCode: false,
        url: `https://httpbin.org/anything/${elementId}`,
        body: {
          "Element Name": "Stool",
        },
      }).as("putResponse");
      cy.log("Patch request was sent");
    });
    // Step 6: assert that the status code of Patch request is 200
    cy.get("@putResponse").its("status").should("eq", 200);
    cy.log("Patch request status is correct");
    // Step 7: assert that the response body is not empty
    cy.get("@putResponse").its("body").should("not.be.empty");
    cy.log("Patch response body is not empty");
    // Step 8: assert that the body includes the updated element name
    cy.get("@putResponse").then((response) => {
      cy.wrap(JSON.stringify(response.body)).should("include", "Stool");
      cy.log("PATCH request works correct");
    });
  });
  /// DELETE work tests
  it("Check DELETE method  with new Body Data ", () => {
    let id;
    //SET-UP
    // Step 1 send GET request to endpoint
    cy.request({
      method: "POST",
      url: "https://httpbin.org/anything",
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
        url: `https://httpbin.org/anything/${id}`,
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
});
