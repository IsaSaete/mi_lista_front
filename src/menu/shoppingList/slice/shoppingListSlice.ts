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
    togglePurchasedStatusOptimistic: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      const ingredientToToggled = state.ingredients.find(
        (ingredient) => ingredient.id === ingredientId,
      );

      if (ingredientToToggled) {
        ingredientToToggled.isPurchased = !ingredientToToggled.isPurchased;
        ingredientToToggled.createdAt = new Date().toISOString();
      }
    },
    updateIngredientFromServer: (state, action: PayloadAction<Ingredient>) => {
      const updatedIngredientId = action.payload.id;
      const updatedIngredient = state.ingredients.find(
        (ingredient) => ingredient.id === updatedIngredientId,
      );

      if (updatedIngredient) {
        updatedIngredient.isPurchased = action.payload.isPurchased;
        updatedIngredient.createdAt = action.payload.createdAt;
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;

      const updatedIngredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== ingredientId,
      );

      state.ingredients = updatedIngredients;
    },
  },
});

export const {
  loadIngredients: loadIngredientsCreator,
  addIngredient: addIngredientCreator,
  togglePurchasedStatusOptimistic: togglePurchasedStatusOptimisticCreator,
  updateIngredientFromServer: updateIngredientFromServerCreator,
  deleteIngredient: deletedIngredientCreator,
} = shoppingListSlice.actions;

export const shoppingListReducer = shoppingListSlice.reducer;
