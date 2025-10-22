import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShoppingListState } from "./types";
import type { Ingredient } from "@/menu/types";

const initialState: ShoppingListState = {
  ingredients: [],
  isLoading: false,
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    startLoadingIngredients: (state) => {
      state.isLoading = true;
    },
    loadIngredients: (
      state,
      { payload: ingredients }: PayloadAction<Ingredient[]>,
    ) => {
      state.ingredients = ingredients;
      state.isLoading = false;
    },
  },
});

export const { loadIngredients, startLoadingIngredients } =
  shoppingListSlice.actions;

export const shoppingListReduder = shoppingListSlice.reducer;
