import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "@/store/store";

describe("Given the AppRouter component", () => {
  describe("when it renders in path /recets that it doesn't exists", () => {
    test("Then it should show a 'Página no encontrada' inside a heading", async () => {
      const expectedTitlePage = /página no encontrada/i;

      render(
        <MemoryRouter initialEntries={["/recers"]}>
          <AppRouter />
        </MemoryRouter>,
      );

      const titlePage = await screen.findByRole("heading", {
        name: expectedTitlePage,
      });

      expect(titlePage).toBeInTheDocument();
    });
  });

  describe("When it render in path /lista-compra", () => {
    test("Then it should show a 'LISTA DE LA COMPRA' inside a heading", async () => {
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
});
