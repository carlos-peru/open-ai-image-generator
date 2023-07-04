///api/generate-image

describe("Image Generator Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Display required error", () => {
    cy.get('[data-test="prompt-input"]').eq(0).type("{enter}");
    cy.get('[data-test="request-error"]').eq(0).should("be.visible");
  });

  it("Also display required error", () => {
    cy.get('[data-test="prompt-input"]').eq(0).type("    {enter}");
    cy.get('[data-test="request-error"]').eq(0).should("be.visible");
  });

  it("Display length error", () => {
    cy.get('[data-test="prompt-input"]')
      .eq(0)
      .type(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.{enter}"
      );
    cy.get('[data-test="request-error"]').eq(0).should("be.visible");
  });

  it("Display generated image", () => {
    cy.intercept("POST", "http://localhost:3000/api/generate-image").as(
      "requestImageGeneration"
    );
    cy.get('[data-test="prompt-input"]').eq(0).type("the beatles{enter}");
    cy.get('[data-test="request-progress"]').eq(0).should("be.visible");
    cy.wait("@requestImageGeneration");
    cy.get('[data-test="generated-image"]').eq(0).should("be.visible");
  });
});
