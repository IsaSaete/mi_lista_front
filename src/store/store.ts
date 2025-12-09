import { configureStore } from "@reduxjs/toolkit";
import { shoppingListReducer } from "@/menu/shoppingList/slice/shoppingListSlice";
import { weeklyMenuReducer } from "@/menu/weeklyMenu/slice/weeklyMenuSlice";
import { authReducer } from "@/auth/slice/authSlice";

const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    weeklyMenu: weeklyMenuReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
