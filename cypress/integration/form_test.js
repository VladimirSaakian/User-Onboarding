describe("user-onboarding", () => {
    beforeEach(() => {
       console.log("test");
       cy.visit("http://localhost:3000");
    });
 
    const getInputField = (name) => {
        return cy.get("Input[name='" + name + "']");
     };

     const testNameInput = () => {
        getInputField("name").type("TestName");
        getInputField("name").type("{selectall}{backspace}");
        cy.contains("Name is a required field.");
        getInputField("name").type("TestName");
        getInputField("name").should("have.value", "TestName");
     };
  
     const testEmailInput = () => {
        getInputField("email").type("TestEmail");
        cy.contains("Must be a valid email");
        getInputField("email").type("{selectall}{backspace}");
        cy.contains("Must include email address.");
        getInputField("email").type("TestEmail@test.com");
        getInputField("email").should("have.value", "TestEmail@test.com");
     };
  
     const testPasswordInput = () => {
        getInputField("password").type("Test");
        cy.contains("Your Password should be at least 6 characters");
        getInputField("password").type("{selectall}{backspace}");
  
        getInputField("password").type("TestPassword");
        getInputField("password").should("have.value", "TestPassword");
        getInputField("password").should("have.attr", "type", "password");
        getInputField("password").next().click();
        getInputField("password").should("have.attr", "type", "text");
        getInputField("password").should("have.value", "TestPassword");
     };

     const testRoleSelection = () => {
        const sel = cy.get("select");
        sel.select("Backend");
        sel.select("");
        cy.contains("You need to pick a role");
        cy.get("select").select("Junior");
        sel.select("Junior");
        sel.should("have.value", "Junior");
     };
  
     const testTerms = () => {
        const box = cy.get("*[name='agreed']");
        box.focus();
        cy.focused().click({ force: true });
        cy.focused().click({ force: true });
        cy.contains("You must accept the TOS");
        cy.focused().click({ force: true });
     };
     it("Email typing test", () => {
        testEmailInput();
     });
     });