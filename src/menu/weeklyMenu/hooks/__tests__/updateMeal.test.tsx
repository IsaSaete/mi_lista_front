import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { setupStore } from "@/store/setupStore";
import { act, renderHook } from "@testing-library/react";
import type { WeeklyMenuState } from "../../slice/types";
import useWeeklyMenu from "../useWeeklyMenu";
import { mondayLunch } from "../../fixtures/recipes";

describe("Given the updateMeal function", () => {
  describe("When it's called with Monday's lunch data", () => {
    test("Then it should updated Monday's lunch data", async () => {
      const initialData: WeeklyMenuState = {
        weeklyMenu: {
          L: { lunch: {}, dinner: {} },
          M: { lunch: {}, dinner: {} },
          X: { lunch: {}, dinner: {} },
          J: { lunch: {}, dinner: {} },
          V: { lunch: {}, dinner: {} },
          S: { lunch: {}, dinner: {} },
          D: { lunch: {}, dinner: {} },
        },
      };

      const store = setupStore({ weeklyMenu: initialData });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useWeeklyMenu(), {
        wrapper: wrapper,
      });

      await act(async () => {
        result.current.updateMeal(mondayLunch);
      });

      const weeklyMenuUpdate = result.current.weeklyMenu;

      expect(weeklyMenuUpdate.L.lunch).toMatchObject({
        firstPlate: mondayLunch.mealData.firstPlate,
      });
    });
  });
});
