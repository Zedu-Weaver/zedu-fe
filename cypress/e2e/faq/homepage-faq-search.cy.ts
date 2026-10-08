describe("Homepage FAQ search", () => {
  const triggers = "button[data-radix-collection-item]";
  const pricing = "How does pricing work for educational institutions?";

  beforeEach(() => {
    // Missing local analytics config loads homepage HTML as a script.
    // Stub only that unrelated request; keep application errors visible.
    cy.intercept(
      { query: { id: "undefined" } },
      {
        headers: { "content-type": "application/javascript" },
        body: "",
      }
    );
    cy.visit(`${Cypress.env("baseUrl")}/`);
    cy.contains("h1", "Got a Question?").closest("section").as("faq");
  });

  const search = () => cy.get("@faq").find('input[type="search"]');

  it("filters questions regardless of case and surrounding whitespace", () => {
    cy.get("@faq").find(triggers).should("have.length", 6);
    cy.get("@faq").find("label").should("have.text", "Search FAQs");
    search().type("pricing");
    cy.get("@faq")
      .find(triggers)
      .should("have.length", 1)
      .and("contain", pricing);
    search().clear().type("  PRICING  ");
    cy.get("@faq")
      .find(triggers)
      .should("have.length", 1)
      .and("contain", pricing);
  });

  it("matches collapsed answer text and keeps filtered accordions operable", () => {
    search().type("mentoring");
    cy.get("@faq")
      .find(triggers)
      .should("have.length", 1)
      .and("contain", "Is student support fully automated?")
      .click();
    cy.get("@faq").find(triggers).should("have.attr", "aria-expanded", "true");
    cy.get("@faq")
      .contains("while educators and staff remain in control")
      .should("be.visible");
    cy.get("@faq").find(triggers).click();
    cy.get("@faq").find(triggers).should("have.attr", "aria-expanded", "false");
  });

  it("shows no-results feedback and clears the search with focus restored", () => {
    search().type("zzzz-no-faq-match");
    cy.get("@faq").find(triggers).should("not.exist");
    cy.get("@faq")
      .find('[role="status"]')
      .should("have.text", "No FAQs match your search.");
    cy.get("@faq").contains("button", "Clear search").click();
    search().should("have.value", "").and("be.focused");
    cy.get("@faq").find(triggers).should("have.length", 6);
    search().type("pricing").clear();
    cy.get("@faq").find(triggers).should("have.length", 6);
    search().type("   ");
    cy.get("@faq").find(triggers).should("have.length", 6);
  });

  it("does not restore hidden expansion state when the query changes", () => {
    cy.get("@faq").contains("button", pricing).click();
    search().type("mentoring").clear();
    cy.get("@faq")
      .contains("button", pricing)
      .should("have.attr", "aria-expanded", "false");
  });

  [375, 1280].forEach((width) => {
    it(`fits the FAQ controls and results at ${width}px`, () => {
      cy.viewport(width, 900);
      search().type("pricing");
      cy.get("@faq").then(($section) => {
        expect($section[0].scrollWidth).to.be.at.most($section[0].clientWidth);
      });
      cy.get("@faq").contains("button", "Clear search").should("be.visible");
      cy.get("@faq").find(triggers).should("be.visible");
    });
  });

  it("keeps search off the other pages sharing the FAQ component", () => {
    [
      "/pricing",
      "/products/channels",
      "/products/buzz",
      "/products/file-management",
    ].forEach((path) => {
      cy.visit(`${Cypress.env("baseUrl")}${path}`);
      cy.contains("h1", "Got a Question?")
        .closest("section")
        .within(() => {
          cy.get('input[type="search"]').should("not.exist");
          cy.get(triggers).should("have.length.greaterThan", 0);
        });
    });
  });
});
