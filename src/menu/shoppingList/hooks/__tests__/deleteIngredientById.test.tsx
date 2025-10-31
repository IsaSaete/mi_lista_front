import { aceite, ingredientList } from "@/mockData/ingredients";
import type { ShoppingListState } from "../../slice/types";
import setupStore from "@/store/setupStore";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { act, renderHook } from "@testing-library/react";
import useShoppingList from "../useShoppingList";

describe("Given the deleteIngredientById function", () => {
  describe("When it's called with Aceite de oliva ingredient id", () => {
    test("Then it should delete Aceite de oliva of shopping list", async () => {
      const initialState: ShoppingListState = {
        ingredients: ingredientList,
      };

      const store = setupStore({ shoppingList: initialState });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useShoppingList(), {
        wrapper: wrapper,
      });

      await act(async () => {
        result.current.deleteIngredientById(aceite.id);
      });

      const ingredients = result.current.ingredients;

      expect(ingredients).not.toContainEqual(
        expect.objectContaining({ name: aceite.name }),
      );
    });
  });
});
