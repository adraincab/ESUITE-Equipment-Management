/// <reference types="Cypress" />

context("Equipment Tests", () => {
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

    cy.visit("http://localhost:8080/equipment");
  });

  it("Create equipment with valid serial number", () => {
    cy.server();
    cy.route("POST", "/api/equipment").as("equip");

    cy.get('input[placeholder="Enter Serial Number"]')
      .type("cyEquip")
      .should("have.value", "cyEquip");

    cy.get('input[placeholder="Vendor"]')
      .type("cyVendor")
      .should("have.value", "cyVendor");

    cy.get('input[placeholder="Model"]')
      .type("cyModel")
      .should("have.value", "cyModel");

    cy.get('input[placeholder="Location"]')
      .type("cyLocation")
      .should("have.value", "cyLocation");

    cy.get('textarea[placeholder="Notes"]')
      .type("cyNotes")
      .should("have.value", "cyNotes");

    cy.get('input[placeholder="Enter Name"]')
      .type("cyName")
      .should("have.value", "cyName");

    cy.get('input[placeholder="Enter Phone Number"]')
      .type("cyPhone")
      .should("have.value", "cyPhone");

    cy.get('input[placeholder="Enter Resource Number"]')
      .type("cyRes")
      .should("have.value", "cyRes");

    cy.get('input[placeholder="Enter Position"]')
      .type("cyPosition")
      .should("have.value", "cyPosition");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
      cy.wait("@equip");

      //Assert on XHR
      cy.get("@equip").then(function(xhr) {
        expect(xhr.status).to.eq(201);
      });
    });

    //wait for page to load
    cy.wait(1500);

    cy.get("td").contains("cyEquip");
  });

  it("Delete equip", () => {
    cy.server();
    cy.route("*", "/api/equipment").as("deleteequip");

    //wait for page to load
    cy.wait(500);

    cy.get("td")
      .contains("cyEquip")
      .click();

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Delete")
        .click();
      cy.wait("@deleteequip");

      //Assert on XHR
      cy.get("@deleteequip").then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
    });

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/equipment");
  });
});
