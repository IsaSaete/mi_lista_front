import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { tomato } from "@/mockData/ingredients";
import type { ShoppingListState } from "../../slice/types";
import setupStore from "@/store/setupStore";
import useShoppingList from "../useShoppingList";

describe("Given the togglePurchasedStatus function", () => {
  describe("When it's called with Tomato's id ingredient that is not purchased", () => {
    test("Then it should update Tomato ingredient and it's purchased", async () => {
      const initialState: ShoppingListState = {
        ingredients: [tomato],
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
        result.current.togglePurchasedStatus(tomato.id);
      });

      const ingredients = result.current.ingredients;

      expect(ingredients).toContainEqual(
        expect.objectContaining({
          name: tomato.name,
          isPurchased: tomato.isPurchased,
        }),
      );
    });
  });
});
