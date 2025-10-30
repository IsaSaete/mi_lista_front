import { configureStore } from "@reduxjs/toolkit";
import { shoppingListReducer } from "@/menu/shoppingList/slice/shoppingListSlice";

const store = configureStore({
  reducer: { shoppingList: shoppingListReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
