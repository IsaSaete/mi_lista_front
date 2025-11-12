import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeeklyMenuState } from "./types";
import type { WeeklyMenu } from "@/menu/types";

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
  },
});

export const { loadWeeklyMenu: loadWeeklyMenuCreator } =
  weeklyMenuSlice.actions;

export const weeklyMenuReducer = weeklyMenuSlice.reducer;
