import { render, screen } from "@testing-library/react";
import MenuSection from "./MenuSection";
import { weeklyMenuData } from "../../fixtures/recipes";
import { Provider } from "react-redux";
import store from "@/store/store";

describe("Given the MenuSection component", () => {
  const action = vitest.fn();

  beforeEach(() => {
    action.mockClear();
  });

  describe("When it renders with Wednesday`s lunch data", () => {
    test("Then it should show a 'comida' inside a heading", async () => {
      const wednesdayLunch = weeklyMenuData.X.lunch;

      render(
        <Provider store={store}>
          <MenuSection
            mealType="lunch"
            meal={wednesdayLunch}
            onEdit={action}
            addIngredients={action}
          />
        </Provider>,
      );

      const mealType = await screen.findByRole("heading", { name: /comida/i });

      expect(mealType).toBeInTheDocument();
    });

    test("Then it should show a button with label text 'Editar'", async () => {
      const wednesdayLunch = weeklyMenuData.X.lunch;

      render(
        <Provider store={store}>
          <MenuSection
            mealType="lunch"
            meal={wednesdayLunch}
            onEdit={action}
            addIngredients={action}
          />
        </Provider>,
      );

      const textButton = await screen.findByRole("button", { name: /editar/i });

      expect(textButton).toBeInTheDocument();
    });
  });
});
