import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    test("Then it should show duplicate feedback when adding an existing ingredient", async () => {
      const user = userEvent.setup();

      render(
        <Provider store={store}>
          <ShoppingListPage />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      await screen.findByText(/aceite de oliva virgen extra/i);

      const input = screen.getByLabelText(/nombre del ingrediente/i);
      const addButton = screen.getByRole("button", {
        name: /añadir ingrediente/i,
      });

      await user.type(input, "Aceite de oliva virgen extra");
      await user.click(addButton);

      const duplicateFeedback = await screen.findByText(
        /este ingrediente ya está en la cesta/i,
      );

      expect(duplicateFeedback).toBeInTheDocument();
      expect(duplicateFeedback).toHaveClass("text-error");
      expect(duplicateFeedback).toHaveAttribute("role", "alert");
    });

    test("Then it should show sr-only feedback when ingredient is added", async () => {
      const user = userEvent.setup();

      render(
        <Provider store={store}>
          <ShoppingListPage />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const input = screen.getByLabelText(/nombre del ingrediente/i);
      const addButton = screen.getByRole("button", {
        name: /añadir ingrediente/i,
      });

      await user.type(input, "Quinoa");
      await user.click(addButton);

      const successFeedback = await screen.findByText(
        /ingrediente añadido a la lista de la compra/i,
      );

      expect(successFeedback).toBeInTheDocument();
      expect(successFeedback).toHaveClass("sr-only");
      expect(successFeedback).toHaveAttribute("role", "status");
      expect(successFeedback).toHaveAttribute("aria-live", "polite");
    });
  });
});
