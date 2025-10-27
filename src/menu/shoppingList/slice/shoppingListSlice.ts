import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShoppingListState } from "./types";
import type { Ingredient } from "@/menu/types";

const initialState: ShoppingListState = {
  ingredients: [],
  isLoading: true,
};

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    loadIngredients: (
      state,
      { payload: ingredients }: PayloadAction<Ingredient[]>,
    ) => {
      state.ingredients = ingredients;
      state.isLoading = false;
    },
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      const newIngredient = action.payload;
      state.ingredients.push(newIngredient);
    },
  },
});

export const {
  loadIngredients: loadIngredientsCreator,
  addIngredient: addIngredientCreator,
} = shoppingListSlice.actions;

export const shoppingListReducer = shoppingListSlice.reducer;
