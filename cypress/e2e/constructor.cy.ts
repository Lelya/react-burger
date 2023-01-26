/// <reference types="cypress" />
export {}

const bunText = "Краторная булка N-200i";
const modal = '[class^="modal"]'
describe("service is available", () => {
  it("should be available on localhost:3000", () => {
    cy.viewport(1440, 842);
    cy.visit("/");
  });
});


describe("«Конструктор»", () => {
  it("Открытие и закрытие модального окна с описанием ингредиента", () => {
    cy.viewport(1440, 842);
    cy.visit("/");
    cy.get("p").contains(`${bunText}`).click({ force: true });
    cy.get("body").type("{esc}");
  });
});

describe("«Оформить заказ»", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    window.localStorage.setItem(
        "refreshToken",
        JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')
  });

  it("Открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»", () => {
    cy.viewport(1440, 842);
    cy.visit("login");
    cy.get("p").contains(`${bunText}`).trigger("dragstart");
    cy.get('[data-test="drop-place"]').as("drop-place").trigger("drop");
    cy.get(`[data-test="Соус Spicy-X"]`).as("items").trigger("dragstart");
    cy.get("@drop-place").trigger("drop");
    cy.get("button").contains("Оформить заказ").click();
    cy.get("body").type("{esc}");
  });
});