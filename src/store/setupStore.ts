import { configureStore } from "@reduxjs/toolkit";
import { shoppingListReducer } from "@/menu/shoppingList/slice/shoppingListSlice";
import type { ShoppingListState } from "@/menu/shoppingList/slice/types";

export type RootState = { shoppingList: ShoppingListState };

const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: { shoppingList: shoppingListReducer },
    preloadedState,
  });
};

export default setupStore;
