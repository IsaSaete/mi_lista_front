import { render, screen } from "@testing-library/react";
import IngredientForm from "./IngredientForm";
import { MemoryRouter } from "react-router";

describe("Given the IngredientForm componente", () => {
  const action = vitest.fn();

  describe("When it renders", () => {
    test("Then it should show a 'Nombre del ingrediente' text box", () => {
      render(<IngredientForm addIngredient={action} />, {
        wrapper: MemoryRouter,
      });

      const ingredientTextBox = screen.getByLabelText("Nombre del ingrediente");

      expect(ingredientTextBox).toBeInTheDocument();
    });
  });
});
