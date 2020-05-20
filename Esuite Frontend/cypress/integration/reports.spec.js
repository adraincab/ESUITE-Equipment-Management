/// <reference types="Cypress" />

context("Reports Tests", () => {
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

    cy.visit("http://localhost:8080/reports");
  });

  it("Preview Report", () => {
    cy.server();
    cy.route("GET", "/api/report/preview/*").as("report");

    cy.get("select")
      .select("All")
      .should("have.value", "All");

    cy.wait("@report");

    //Assert on XHR
    cy.get("@report").then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
  });

  it("Download Report", () => {
    cy.server();
    cy.route("GET", "/api/report/*").as("report");

    cy.get("select")
      .select("All")
      .should("have.value", "All");

    cy.wait(500);

    cy.get("button")
      .contains("Download Report")
      .click();
    cy.wait("@report");

    //Assert on XHR
    cy.get("@report").then(function(xhr) {
      expect(xhr.status).to.eq(200);
    });
  });
});
