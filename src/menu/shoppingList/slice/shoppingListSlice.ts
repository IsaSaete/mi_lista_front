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
    togglePurchasedStatus: (state, action: PayloadAction<Ingredient>) => {
      const ingredientId = action.payload.id;
      const ingredientToToggled = state.ingredients.find(
        (ingredient) => ingredient.id === ingredientId,
      );

      if (ingredientToToggled) {
        ingredientToToggled.isPurchased = !ingredientToToggled.isPurchased;
      }
    },
  },
});

export const {
  loadIngredients: loadIngredientsCreator,
  addIngredient: addIngredientCreator,
  togglePurchasedStatus: togglePurchasedStatusCreator,
} = shoppingListSlice.actions;

export const shoppingListReducer = shoppingListSlice.reducer;
