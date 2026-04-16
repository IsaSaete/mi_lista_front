import { Provider } from "react-redux";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import setupStore from "@/store/setupStore";
import { aceite, espagueti } from "@/mockData/ingredients";
import type { ShoppingListState } from "../../slice/types";
import useShoppingList from "../useShoppingList";
import type { IngredientSendFormData } from "@/menu/types";
import showToast from "@/UI/toast/showToast";

vi.mock("@/UI/toast/showToast");

const duplicateMessage = "Este ingrediente ya está en la cesta";

describe("Given the addIngredient function", () => {
  const mockedShowToast = vi.mocked(showToast);

  beforeEach(() => {
    mockedShowToast.mockClear();
    vi.restoreAllMocks();
  });

  describe("When it's called with the Albahaca ingredient data", () => {
    test("Then it should show Albahaca in shopping list", async () => {
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
        const status = await result.current.addIngredient(albahaca);
        expect(status).toBe("added");
      });

      const ingredients = result.current.ingredients;

      expect(ingredients).toContainEqual(
        expect.objectContaining({ name: albahaca.name }),
      );
    });
  });

  describe("When the ingredient name is already in the shopping list", () => {
    test("Then it should not add a duplicate", async () => {
      const initialState: ShoppingListState = {
        ingredients: [aceite],
        isLoading: false,
      };

      const store = setupStore({ shoppingList: initialState });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useShoppingList(), { wrapper });
      const fetchSpy = vi.spyOn(global, "fetch");

      await act(async () => {
        const status = await result.current.addIngredient({
          name: aceite.name,
        });
        expect(status).toBe("duplicate");
      });

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(mockedShowToast).not.toHaveBeenCalledWith(
        "error",
        duplicateMessage,
      );
      expect(result.current.ingredients).toHaveLength(1);
    });
  });

  describe("When the server responds with a duplicate ingredient error", () => {
    test("Then it should not update the list", async () => {
      const initialState: ShoppingListState = {
        ingredients: [],
        isLoading: false,
      };

      const store = setupStore({ shoppingList: initialState });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useShoppingList(), { wrapper });
      const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(
        new Response(JSON.stringify({ error: duplicateMessage }), {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }),
      );

      await act(async () => {
        const status = await result.current.addIngredient({
          name: "Nuevo",
        });
        expect(status).toBe("duplicate");
      });

      expect(mockedShowToast).not.toHaveBeenCalledWith(
        "error",
        duplicateMessage,
      );
      expect(result.current.ingredients).toHaveLength(0);
      expect(fetchSpy).toHaveBeenCalled();
    });
  });
});
