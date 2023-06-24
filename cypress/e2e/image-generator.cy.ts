///api/generate-image

describe("Image Generator Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.intercept("POST", "http://localhost:3000/api/generate-image").as(
      "requestImageGeneration"
    );
  });

  it("Display error", () => {
    cy.get('[data-test="description-input"]').eq(0).type("    {enter}");
    cy.get('[data-test="request-progress"]').eq(0).should("be.visible");
    cy.wait("@requestImageGeneration");
    cy.get('[data-test="request-error"]').eq(0).should("be.visible");
  });

  it("Display generated image", () => {
    cy.get('[data-test="description-input"]').eq(0).type("the beatles{enter}");
    cy.get('[data-test="request-progress"]').eq(0).should("be.visible");
    cy.wait("@requestImageGeneration");
    cy.get('[data-test="generated-image"]').eq(0).should("be.visible");
  });
});
