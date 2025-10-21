import type { Ingredient } from "@/menu/types";

export type IngredientDto = Omit<Ingredient, "id" | "createdAt"> & {
  _id: string;
  createdAt: string;
};

export type ShoppingListDto = {
  _id: string;
  ingredients: IngredientDto[];
  updatedAt: string;
};

export type ShoppingListResponseDto = {
  shoppingList: ShoppingListDto;
};
