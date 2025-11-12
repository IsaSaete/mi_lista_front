import store from "@/store/store";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import useWeeklyMenu from "../useWeeklyMenu";
import { weeklyMenuData } from "../../fixtures/receipes";

describe("Given the loadWeeklyMenu function", () => {
  describe("When it's called", () => {
    test("Then it should show aadsa", async () => {
      const expectedWeeklyMenuData = weeklyMenuData;

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>
          <Provider store={store}>{children}</Provider>
        </MemoryRouter>
      );

      const { result } = renderHook(() => useWeeklyMenu(), {
        wrapper: wrapper,
      });

      await act(() => {
        result.current.loadWeeklyMenu();
      });

      const weekMenuData = result.current.weeklyMenu;

      expect(weekMenuData).toEqual(expectedWeeklyMenuData);
    });
  });
});
