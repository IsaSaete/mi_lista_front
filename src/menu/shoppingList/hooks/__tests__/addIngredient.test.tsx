import { Provider } from "react-redux";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import setupStore from "@/store/setupStore";
import { aceite, espagueti } from "@/mockData/ingredients";
import type { ShoppingListState } from "../../slice/types";
import useShoppingList from "../useShoppingList";
import type { IngredientSendFormData } from "@/menu/types";

describe("Given the addIngredient function", () => {
  describe("When it's called with the Albahaca ingredient data", () => {
    test("Then it should show Albaha in shopping list", async () => {
      const initialState: ShoppingListState = {
        ingredients: [aceite, espagueti],
        isLoading: false,
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

      const albahaca: IngredientSendFormData = { name: "Albahaca" };

      await act(async () => {
        result.current.addIngredient(albahaca);
      });

      const ingredients = result.current.ingredients;

      expect(ingredients).toContainEqual(
        expect.objectContaining({ name: albahaca.name }),
      );
    });
  });
});
