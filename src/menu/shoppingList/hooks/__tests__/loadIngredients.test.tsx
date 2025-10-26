import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import useShoppingList from "../useShoppingList";
import store from "@/store/store";

describe("Given the loadIngredients function", () => {
  describe("When it's called", () => {
    test("Then it should show a list of ingredients with 'Tomate' names", async () => {
      const expectedIngredientName = "Tomate";

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useShoppingList(), {
        wrapper: wrapper,
      });

      await act(() => {
        result.current.loadIngredients();
      });

      const ingredients = result.current.ingredients;

      expect(ingredients).toContainEqual(
        expect.objectContaining({ name: expectedIngredientName }),
      );
    });
  });
});
