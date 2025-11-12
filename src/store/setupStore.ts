import { configureStore } from "@reduxjs/toolkit";
import { shoppingListReducer } from "@/menu/shoppingList/slice/shoppingListSlice";
import type { ShoppingListState } from "@/menu/shoppingList/slice/types";
import { weeklyMenuReducer } from "@/menu/weeklyMenu/slice/weeklyMenuSlice";

export type RootState = { shoppingList: ShoppingListState };

const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: {
      shoppingList: shoppingListReducer,
      weeklyMenu: weeklyMenuReducer,
    },
    preloadedState,
  });
};

export default setupStore;
