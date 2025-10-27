import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IngredientForm from "./IngredientForm";
import { MemoryRouter } from "react-router";

describe("Given the IngredientForm componente", () => {
  const action = vitest.fn();
  const user = userEvent.setup();

  describe("When it renders", () => {
    test("Then it should show a 'Nombre del ingrediente' text box", () => {
      render(<IngredientForm addIngredient={action} />, {
        wrapper: MemoryRouter,
      });

      const ingredientTextBox = screen.getByLabelText("Nombre del ingrediente");

      expect(ingredientTextBox).toBeInTheDocument();
    });
  });

  describe("And the user types the name ingredient 'tomate' in text box", () => {
    test("Then it should show 'Tomate' to enter de name", async () => {
      const expectedLabel = /nombre del ingrediente/i;
      const expectedTypeName = "tomate";

      render(<IngredientForm addIngredient={action} />, {
        wrapper: MemoryRouter,
      });

      const ingredientNameTextBox = screen.getByLabelText(expectedLabel);

      await user.type(ingredientNameTextBox, expectedTypeName);

      expect(ingredientNameTextBox).toHaveValue(expectedTypeName);
    });

    describe("And the user clicks on '+' button", () => {
      test("Then it should call the button action", async () => {
        const expectedButtonText = /añadir ingrediente/i;
        const expectedLabel = /nombre del ingrediente/i;
        const expectedTypeName = "tomate";

        render(<IngredientForm addIngredient={action} />, {
          wrapper: MemoryRouter,
        });

        const ingredientNameTextBox = screen.getByLabelText(expectedLabel);

        await user.type(ingredientNameTextBox, expectedTypeName);

        const addButton = screen.getByRole("button", {
          name: expectedButtonText,
        });

        expect(addButton).toBeInTheDocument();

        await user.click(addButton);

        expect(action).toHaveBeenCalled();
      });
    });
  });
});
