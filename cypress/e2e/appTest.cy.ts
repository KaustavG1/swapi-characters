describe("SWAPI Characters App", () => {
  it("renders the dashboard page", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".loader").should("exist").should("have.text", "Loading ...");
    cy.get(".search-bar").should("exist");
    cy.get(".fav-button").should("exist");
    cy.get(".pagination-buttons").should("exist");
    cy.get(".list-container").scrollTo("bottom");
  });

  it("opens up details page when character card is clicked", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".character-card").should("have.length", 10);
    cy.get(".character-card").eq(0).should("contain", "Luke Skywalker").click();
    cy.url().should("include", "/1");
  });

  it("searches for a character on the current page", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".search-bar").should("exist").type("Hello World");
    cy.get(".empty-record-message")
      .should("exist")
      .should("have.text", "No Records found.");
    cy.get(".search-bar").clear();
    cy.get(".search-bar").type("Luk");
    cy.get(".character-card").should("have.length", 1);
    cy.get(".character-card").eq(0).should("contain", "Luke Skywalker").click();
  });

  it("goes to next page and comes back to previous page", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".character-card").eq(0).should("contain", "Luke Skywalker");
    cy.get(".pagination-buttons").contains(">").click();
    cy.get(".character-card").eq(0).should("contain", "Anakin Skywalker");
    cy.get(".pagination-buttons").contains("<").click();
    cy.get(".character-card").eq(0).should("contain", "Luke Skywalker");
  });

  it("opens up the favourites page and goes back on respective button clicks", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".fav-button").should("exist").click();
    cy.url().should("include", "favourites");
    cy.get(".section-header").should("exist").should("have.text", "Favourites");
    cy.get(".empty-record-message")
      .should("exist")
      .should("have.text", "No Records found.");
    cy.get(".back-button").click();
    cy.url().should("equal", "http://localhost:5173/");
  });

  it("renders details page, adds/removes favourites and verifies data on favourites page", () => {
    cy.visit("http://localhost:5173/1");
    cy.get(".section-header")
      .should("exist")
      .should("have.text", "Character Details");
    cy.get(".section-details")
      .should("exist")
      .should("contain", "Luke Skywalker");
    cy.get(".section-details")
      .should("exist")
      .should("contain", "Favourite: false");
    cy.get(".make-fav").should("exist").click();
    cy.get(".section-details").should("contain", "Favourite: true");
    cy.visit("http://localhost:5173/favourites");
    cy.get(".character-card").eq(0).should("contain", "Luke Skywalker").click();
    cy.get(".section-details").should("contain", "Luke Skywalker");
    cy.get(".make-fav").should("exist").click();
    cy.get(".section-details").should("contain", "Favourite: false");
    cy.visit("http://localhost:5173/favourites");
    cy.get(".section-header").should("exist").should("have.text", "Favourites");
    cy.get(".empty-record-message")
      .should("exist")
      .should("have.text", "No Records found.");
  });
});
