import { configureStore } from "@reduxjs/toolkit";
import { shoppingListReducer } from "@/menu/shoppingList/slice/shoppingListSlice";
import type { ShoppingListState } from "@/menu/shoppingList/slice/types";
import { weeklyMenuReducer } from "@/menu/weeklyMenu/slice/weeklyMenuSlice";
import type { WeeklyMenuState } from "@/menu/weeklyMenu/slice/types";
import type { AuthState } from "@/auth/slice/types";
import { authReducer } from "@/auth/slice/authSlice";

export type RootState = {
  shoppingList: ShoppingListState;
  weeklyMenu: WeeklyMenuState;
  auth: AuthState;
};

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      shoppingList: shoppingListReducer,
      weeklyMenu: weeklyMenuReducer,
      auth: authReducer,
    },
    preloadedState: preloadedState as RootState,
  });
};
export default setupStore;
