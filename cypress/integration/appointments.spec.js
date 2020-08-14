describe("Appointments", () => {

    it("should book an interview", () => {
        cy.visit("/");
        cy.contains("Monday");
      });
  
    /// BOOKING 
  
    it("Clicks on the Add button in the second appointment", () => {
        cy.get("[alt=Add]")
        .first()
        .click();
    });
  
    // it("Enters their name", () => {
    //     cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");    });
   
    // it("Chooses an interviewer", () => {
    //   cy.visit("/");
    // });
  
    // it("Clicks the save button", () => {
    //   cy.visit("/");
    // });
    
    // it("Sees the booked appointment", () => {
    //   cy.visit("/");
    // });
  
  
    // /// EDITING
    // it("Visits the root of our web server", () => {
    //   cy.visit("/");
    // });
  
    // it("Clicks the edit button for the existing appointment", () => {
    //   cy.visit("/");
    // });
   
    // it("Changes the name and interviewer", () => {
    //   cy.visit("/");
    // });
  
    // it("Clicks the save button", () => {
    //   cy.visit("/");
    // });
    
    // it("Sees the edit to the appointment", () => {
    //   cy.visit("/");
    // });
  
    
    // /// CANCELLING 
    // it("Visits the root of our web server", () => {
    //   cy.visit("/");
    // });
  
    // it("Clicks the delete button for the existing appointment", () => {
    //   cy.visit("/");
    // });
   
    // it("Clicks the confirm button", () => {
    //   cy.visit("/");
    // });
  
    // it("Sees that the appointment slot is empty", () => {
    //   cy.visit("/");
    // });
    
  
  
  });
  