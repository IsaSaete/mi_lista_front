import { render, screen } from "@testing-library/react";
import MenuSection from "./MenuSection";
import { weeklyMenuData } from "../../fixtures/receipes";

describe("Given the MenuSection component", () => {
  describe("When it renders with Wednesday`s lunch data", () => {
    test("Then it should show a 'comida' inside a heading", async () => {
      const wednesdayLunch = weeklyMenuData.X.lunch;

      render(<MenuSection mealType="comida" meal={wednesdayLunch} />);

      const mealType = await screen.findByRole("heading", { name: /comida/i });

      expect(mealType).toBeInTheDocument();
    });

    test("Then it should show a button with label text 'Editar'", async () => {
      const wednesdayLunch = weeklyMenuData.X.lunch;

      render(<MenuSection mealType="comida" meal={wednesdayLunch} />);

      const textButton = await screen.findByRole("button", { name: /editar/i });

      expect(textButton).toBeInTheDocument();
    });
  });
});
