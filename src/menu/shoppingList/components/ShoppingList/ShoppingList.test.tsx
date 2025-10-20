import { albahaca, tomato } from "@/mockData/ingredients";
import { render, screen } from "@testing-library/react";
import ShoppingList from "./ShoppingList";

describe("Given the ShoppingList componetn", () => {
  describe("When it receives a 'Tomate, Albahaca fresca'", () => {
    test("Then it should show the names inside a heading", () => {
      const expectedTomatoName = tomato.name;
      const expectedAlbahacaName = albahaca.name;

      const ingredientsData = [tomato, albahaca];

      render(<ShoppingList ingredients={ingredientsData} />);

      const tomatoName = screen.getByRole("heading", {
        name: expectedTomatoName,
      });
      const albahacaName = screen.getByRole("heading", {
        name: expectedAlbahacaName,
      });

      expect(tomatoName).toBeInTheDocument();
      expect(albahacaName).toBeInTheDocument();
    });
  });
});
