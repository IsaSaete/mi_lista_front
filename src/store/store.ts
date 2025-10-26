import { shoppingListReducer } from "@/menu/shoppingList/slice/shoppingListSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { shoppingList: shoppingListReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
