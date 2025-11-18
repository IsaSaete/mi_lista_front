import { configureStore } from "@reduxjs/toolkit";
import { shoppingListReducer } from "@/menu/shoppingList/slice/shoppingListSlice";
import type { ShoppingListState } from "@/menu/shoppingList/slice/types";
import { weeklyMenuReducer } from "@/menu/weeklyMenu/slice/weeklyMenuSlice";
import type { WeeklyMenuState } from "@/menu/weeklyMenu/slice/types";

export type RootState = {
  shoppingList: ShoppingListState;
  weeklyMenu: WeeklyMenuState;
};

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      shoppingList: shoppingListReducer,
      weeklyMenu: weeklyMenuReducer,
    },
    preloadedState: preloadedState as RootState,
  });
};
export default setupStore;
