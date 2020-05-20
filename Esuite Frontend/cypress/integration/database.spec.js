/// <reference types="Cypress" />

context("Database Tests", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", "/api/token").as("user");

    cy.visit("http://localhost:8080/");
    //cy.visit("http://localhost:5000/");

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

    cy.url().should("include", "/user");

    cy.visit("http://localhost:8080/database");
  });

  it("Backup Database", () => {
    cy.server();
    cy.route("GET", "/api/database").as("db");

    cy.get("button")
      .contains("Backup Database")
      .click();
    cy.wait("@db");

    //Assert on XHR
    cy.get("@db").then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
  });

  it("Set Auto Backup Database", () => {
    cy.server();
    cy.route("PATCH", "/api/config/auto_backup").as("config");

    cy.wait(500);

    cy.get('input[placeholder="Location"]').clear();

    cy.get('input[placeholder="Location"]')
      .type("C:\\cypressTest\\backup")
      .should("have.value", "C:\\cypressTest\\backup");

    cy.get("select")
      .select("12 Hour")
      .should("have.value", "43200000");

    cy.get("button")
      .contains("Save Auto Backups")
      .click();
    cy.wait("@config");

    //Assert on XHR
    cy.get("@config").then(function(xhr) {
      expect(xhr.status).to.eq(204);
    });
  });

  it("Restore database with no file selected", () => {
    cy.get("button")
      .contains("Restore Database")
      .click();

    cy.get("div").contains("No File Selected");
  });
});
