import { createSelector } from "@reduxjs/toolkit";
import type { Ingredient } from "@/menu/types";
import type { RootState } from "@/store/store";

export const selectSeparatedIngredients = createSelector(
  (state: RootState): Ingredient[] => state.shoppingList.ingredients,
  (ingredients: Ingredient[]) => {
    const sortedIngredients = [...ingredients].sort(
      (ingredientA, ingredientB) =>
        new Date(ingredientB.createdAt).getTime() -
        new Date(ingredientA.createdAt).getTime(),
    );

    const toBuyIngredients = sortedIngredients
      .filter((ingredient) => !ingredient.isPurchased)
      .reverse();

    const purchasedIngredients = sortedIngredients
      .filter((ingredient) => ingredient.isPurchased)
      .slice(0, 10);

    return {
      toBuyIngredients,
      purchasedIngredients,
    };
  },
);
