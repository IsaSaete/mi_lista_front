import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import ShoppingListPage from "./ShoppingListPage";
import store from "@/store/store";

describe("Given the ShoppingListPage component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'Lista de la compra' inside a heading", () => {
      const expectedTitle = /lista de la compra/i;

      render(
        <Provider store={store}>
          <ShoppingListPage />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const pageTitle = screen.getByRole("heading", {
        name: expectedTitle,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});
