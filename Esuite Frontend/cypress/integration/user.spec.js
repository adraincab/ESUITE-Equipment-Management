/// <reference types="Cypress" />

context("User Tests", () => {
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
  });

  it("SaveUser-PPC-TR1.1 - create duplicate user of your account with valid username and password", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("admin")
      .should("have.value", "admin");

    cy.get('input[placeholder="Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get("select")
      .select("Admin")
      .should("have.value", "Admin");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
    });

    cy.url().should("include", "/users");

    cy.get("div").contains("Can not update your own account");
  });

  it("SaveUser-PPC-TR1.2 - create user with no username", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
    });

    cy.get("div").contains("Username can not be empty");
  });

  it("SaveUser-PPC-TR1.3 - create user with too short username", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("shrt")
      .should("have.value", "shrt");

    cy.get('input[placeholder="Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
    });

    cy.get("div").contains("Username must contain atleast 5 characters");
  });

  it("SaveUser-PPC-TR1.4 - create user with username starting with 'guest'", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("guest1234")
      .should("have.value", "guest1234");

    cy.get('input[placeholder="Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
    });

    cy.get("div").contains("Username can not start with 'guest'");
  });

  it("SaveUser-PPC-TR1.5 - create user with invalid characters in username", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("b@d U$er%")
      .should("have.value", "b@d U$er%");

    cy.get('input[placeholder="Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("password")
      .should("have.value", "password");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
    });

    cy.get("div").contains("Username can only contain Letters and Numbers");
  });

  it("SaveUser-PPC-TR2.1 - create user with no password", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("newUser")
      .should("have.value", "newUser");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
    });

    cy.get("div").contains("Password can not be empty");
  });

  it("SaveUser-PPC-TR2.2 - create user with mis-matching password", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("newUser")
      .should("have.value", "newUser");

    cy.get('input[placeholder="Enter Password"]')
      .type("password1")
      .should("have.value", "password1");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("password2")
      .should("have.value", "password2");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
    });

    cy.get("div").contains("Passwords do not match");
  });

  it("SaveUser-PPC-TR2.3 - create user with weak password", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("newUser")
      .should("have.value", "newUser");

    cy.get('input[placeholder="Enter Password"]')
      .type("weak")
      .should("have.value", "weak");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("weak")
      .should("have.value", "weak");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
    });

    cy.get("div").contains(
      "Password must be 12 characters long, and include one Uppercase, LowerCase, Number, and Special Character"
    );
  });

  it("SaveUser-PPC-TR3 - create regular user with valid username and password", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("newUser")
      .should("have.value", "newUser");

    cy.get('input[placeholder="Enter Password"]')
      .type("goodPassword1!")
      .should("have.value", "goodPassword1!");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("goodPassword1!")
      .should("have.value", "goodPassword1!");

    cy.get("select")
      .select("Regular")
      .should("have.value", "Regular");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
      cy.wait("@user");

      //Assert on XHR
      cy.get("@user").then(function(xhr) {
        expect(xhr.status).to.eq(201);
      });
    });

    //wait for page to load
    cy.wait(1500);

    cy.get("td").contains("newUser");
  });

  it("SaveUser-PPC-TR4 - create duplicate user with valid username and password", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("newUser")
      .should("have.value", "newUser");

    cy.get('input[placeholder="Enter Password"]')
      .type("goodPassword1!")
      .should("have.value", "goodPassword1!");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("goodPassword1!")
      .should("have.value", "goodPassword1!");

    cy.get("select")
      .select("Admin")
      .should("have.value", "Admin");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
      cy.wait("@user");

      //Assert on XHR
      cy.get("@user").then(function(xhr) {
        expect(xhr.status).to.eq(409);
      });
    });

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/users");

    cy.get("div").contains("Failed to create user");
  });

  it("SaveUser-BB-EP-TR1 - create admin user with valid username and password", () => {
    cy.server();
    cy.route("POST", "/api/*").as("user");

    cy.get('input[placeholder="Enter Username"]')
      .type("newAdmin")
      .should("have.value", "newAdmin");

    cy.get('input[placeholder="Enter Password"]')
      .type("goodPassword1!")
      .should("have.value", "goodPassword1!");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("goodPassword1!")
      .should("have.value", "goodPassword1!");

    cy.get("select")
      .select("Admin")
      .should("have.value", "Admin");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Create")
        .click();
      cy.wait("@user");

      //Assert on XHR
      cy.get("@user").then(function(xhr) {
        expect(xhr.status).to.eq(201);
      });
    });

    //wait for page to load
    cy.wait(1500);

    cy.get("td").contains("newAdmin");
  });

  it("update user password", () => {
    cy.server();
    cy.route("*", "/api/*").as("patchuser");

    //wait for page to load
    cy.wait(500);

    cy.get("td")
      .contains("newUser")
      .click();

    cy.get('input[placeholder="Enter Password"]')
      .type("goodPassword2!")
      .should("have.value", "goodPassword2!");

    cy.get('input[placeholder="Re-Enter Password"]')
      .type("goodPassword2!")
      .should("have.value", "goodPassword2!");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Update")
        .click();
      cy.wait("@patchuser");

      //Assert on XHR
      cy.get("@patchuser").then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
    });

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/users");
  });

  it("update user access level", () => {
    cy.server();
    cy.route("*", "/api/*").as("patchuser");

    //wait for page to load
    cy.wait(500);

    cy.get("td")
      .contains("newUser")
      .click();

    cy.get("select")
      .select("Admin")
      .should("have.value", "Admin");

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Update")
        .click();
      cy.wait("@patchuser");

      //Assert on XHR
      cy.get("@patchuser").then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
    });

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/users");
  });

  it("DeleteUser-BB-EP-TR1 - delete user", () => {
    cy.server();
    cy.route("*", "/api/*").as("deleteuser");

    //wait for page to load
    cy.wait(500);

    cy.get("td")
      .contains("newUser")
      .click();

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Delete")
        .click();
      cy.wait("@deleteuser");

      //Assert on XHR
      cy.get("@deleteuser").then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
    });

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/users");
  });

  it("DeleteUser-BB-EP-TR2 - delete admin", () => {
    cy.server();
    cy.route("*", "/api/*").as("deleteuser");

    //wait for page to load
    cy.wait(500);

    cy.get("td")
      .contains("newAdmin")
      .click();

    cy.get(".btn-group").within(() => {
      cy.get("button")
        .contains("Delete")
        .click();
      cy.wait("@deleteuser");

      //Assert on XHR
      cy.get("@deleteuser").then(function(xhr) {
        expect(xhr.status).to.eq(200);
      });
    });

    //wait for page to load
    cy.wait(500);

    cy.url().should("include", "/users");
  });

  it("Toggle Guest Level", () => {
    cy.server();
    cy.route("PATCH", "/api/config/*").as("config");

    //wait for page to load
    cy.wait(500);

    cy.get("div")
      .contains("Guest Login")
      .click();
    cy.wait("@config");

    //Assert on XHR
    cy.get("@config").then(function(xhr) {
      expect(xhr.status).to.eq(204);
    });

    cy.url().should("include", "/user");
  });

  it("Toggle Guest Access Level", () => {
    cy.server();
    cy.route("PATCH", "/api/config/*").as("config");

    //wait for page to load
    cy.wait(500);

    cy.get("div")
      .contains("Guest Access Level")
      .click();
    cy.wait("@config");

    //Assert on XHR
    cy.get("@config").then(function(xhr) {
      expect(xhr.status).to.eq(204);
    });

    cy.url().should("include", "/user");
  });
});
