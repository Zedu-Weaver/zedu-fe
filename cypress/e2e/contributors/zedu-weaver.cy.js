describe("Zedu Weaver contributors", () => {
  it("displays Peace's updated contributor name", () => {
    const baseUrl = Cypress.env("baseUrl");

    cy.visit(`${baseUrl}/contributors/zedu-weaver`);
    cy.contains("h3", "Ihendi Peace").should("be.visible");
    cy.contains("p", "@Pearl").should("be.visible");
  });
});
