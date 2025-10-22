import type { Ingredient } from "@/menu/types";

export interface ShoppingListState {
  ingredients: Ingredient[];
  isLoading: boolean;
}
