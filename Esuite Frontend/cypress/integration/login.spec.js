/// <reference types="Cypress" />

context("Login Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    //cy.visit("http://localhost:5000/");
  });

  it("Login-PPC-TR1 - login with no username", () => {
    cy.get('input[placeholder="Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get("button")
      .contains("Login")
      .click();

    cy.get("div").contains("Username can not be empty");

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/login");
  });

  it("Login-PPC-TR2 - login with no password", () => {
    cy.get('input[placeholder="Enter Username"]')
      .type("bad")
      .should("have.value", "bad");

    cy.get("button")
      .contains("Login")
      .click();

    cy.get("div").contains("Password can not be empty");

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/login");
  });

  it("Login-PPC-TR3 - login with username that doesnt exist", () => {
    cy.server();
    cy.route("POST", "/api/token").as("token");

    cy.get('input[placeholder="Enter Username"]')
      .type("baduser")
      .should("have.value", "baduser");

    cy.get('input[placeholder="Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get("button")
      .contains("Login")
      .click();
    cy.wait("@token");

    //Assert on XHR
    cy.get("@token").then(function(xhr) {
      expect(xhr.status).to.eq(401);
    });

    cy.get("div").contains("Error logging in");

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/login");
  });

  it("Login-PPC-TR3.1 - login with valid username and bad password", () => {
    cy.server();
    cy.route("POST", "/api/token").as("token");

    cy.get('input[placeholder="Enter Username"]')
      .type("regular")
      .should("have.value", "regular");

    cy.get('input[placeholder="Enter Password"]')
      .type("badPassword")
      .should("have.value", "badPassword");

    cy.get("button")
      .contains("Login")
      .click();
    cy.wait("@token");

    //Assert on XHR
    cy.get("@token").then(function(xhr) {
      expect(xhr.status).to.eq(401);
    });

    cy.get("div").contains("Error logging in");

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/login");
  });

  it("Login-PPC-TR4 - login with valid regular credentials", () => {
    cy.server();
    cy.route("POST", "/api/token").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("regular")
      .should("have.value", "regular");

    cy.get('input[placeholder="Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get("button")
      .contains("Login")
      .click();
    cy.wait("@user");

    //Assert on XHR
    cy.get("@user").then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/equipment");
  });

  it("Login-PPC-TR5 - login with valid admin credentials", () => {
    cy.server();
    cy.route("POST", "/api/token").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("admin")
      .should("have.value", "admin");

    cy.get('input[placeholder="Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get("button")
      .contains("Login")
      .click();
    cy.wait("@user");

    //Assert on XHR
    cy.get("@user").then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/users");
  });

  it("Guest Login", () => {
    cy.server();
    cy.route("POST", "/api/token/guest").as("token");

    //wait for API to tell client whether guest Login is allowed or not
    cy.wait(500);

    cy.get("button")
      .contains("Guest Login")
      .click();
    cy.wait("@token");

    //Assert on XHR
    cy.get("@token").then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
  });

  it("Help", () => {
    cy.get("button").within(() => {
      cy.get("img").click();
    });
  });
});
