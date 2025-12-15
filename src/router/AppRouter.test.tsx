import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "@/store/store";

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe("Given the AppRouter component with", () => {
  describe("when it renders with autheticated user in path /recetsa that it doesn't exists", () => {
    test("Then it should show a 'Página no encontrada' inside a heading", async () => {
      Storage.prototype.getItem = vi.fn().mockReturnValue("mock-token-123");
      const expectedTitlePage = /página no encontrada/i;

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/recers"]}>
            <AppRouter />
          </MemoryRouter>
        </Provider>,
      );

      const titlePage = await screen.findByRole("heading", {
        name: expectedTitlePage,
      });

      expect(titlePage).toBeInTheDocument();
    });
  });

  describe("When it render with autheticated user in path /lista-compra", () => {
    test("Then it should show a 'LISTA DE LA COMPRA' inside a heading", async () => {
      Storage.prototype.getItem = vi.fn().mockReturnValue("mock-token-123");
      const expectedTitlePage = /lista de la compra/i;

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/lista-compra"]}>
            <AppRouter />
          </MemoryRouter>
        </Provider>,
      );

      const titlePage = await screen.findByRole("heading", {
        name: expectedTitlePage,
      });

      expect(titlePage).toBeInTheDocument();
    });
  });

  describe("When it render with no autheticated user in path /lista-compra", () => {
    test("Then it should redirect to /auth when accessing protected route", async () => {
      const expectedText = /iniciar sesión/i;

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/recers"]}>
            <AppRouter />
          </MemoryRouter>
        </Provider>,
      );

      const loginButton = await screen.findByRole("button", {
        name: expectedText,
      });
      expect(loginButton).toBeInTheDocument();
    });
  });
});
