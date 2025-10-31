import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { albahaca, tomato } from "@/mockData/ingredients";
import ShoppingList from "./ShoppingList";
import store from "@/store/store";

describe("Given the ShoppingList component", () => {
  describe("When it receives a 'Tomate, Albahaca fresca'", () => {
    test("Then it should show both ingredient names", () => {
      const expectedTomatoName = tomato.name;
      const expectedAlbahacaName = albahaca.name;

      const ingredientsData = [tomato, albahaca];

      render(
        <Provider store={store}>
          <ShoppingList ingredients={ingredientsData} />
        </Provider>,
      );

      const tomatoName = screen.getByText(expectedTomatoName);
      const albahacaName = screen.getByText(expectedAlbahacaName);

      expect(tomatoName).toBeInTheDocument();
      expect(albahacaName).toBeInTheDocument();
    });
  });
});
