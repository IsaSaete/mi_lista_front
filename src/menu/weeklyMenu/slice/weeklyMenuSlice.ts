import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeeklyMenuState } from "./types";
import type { UpdateMeal, WeeklyMenu } from "@/menu/types";

const initialState: WeeklyMenuState = {
  weeklyMenu: {
    L: { lunch: {}, dinner: {} },
    M: { lunch: {}, dinner: {} },
    X: { lunch: {}, dinner: {} },
    J: { lunch: {}, dinner: {} },
    V: { lunch: {}, dinner: {} },
    S: { lunch: {}, dinner: {} },
    D: { lunch: {}, dinner: {} },
  },
  isLoading: true,
};

const weeklyMenuSlice = createSlice({
  name: "weeklyMenu",
  initialState,
  reducers: {
    loadWeeklyMenu: (
      state,
      { payload: weeklyMenu }: PayloadAction<WeeklyMenu>,
    ) => {
      state.isLoading = false;
      state.weeklyMenu = weeklyMenu;
    },
    updateMeal: (state, { payload: updateMeal }: PayloadAction<UpdateMeal>) => {
      const { day, mealData, mealType } = updateMeal;

      return {
        weeklyMenu: {
          ...state.weeklyMenu,
          [day]: { ...state.weeklyMenu[day], [mealType]: mealData },
        },
      };
    },
  },
});

export const {
  loadWeeklyMenu: loadWeeklyMenuCreator,
  updateMeal: updateMealCreator,
} = weeklyMenuSlice.actions;

export const weeklyMenuReducer = weeklyMenuSlice.reducer;
