import type { Ingredient, IngredientSendFormData } from "@/menu/types";
import type { IngredientDto } from "../dto/types";

export interface ShoppingListClientStructure {
  getShoppingList: () => Promise<Ingredient[]>;
  addIngredient: (
    ingredientName: IngredientSendFormData,
  ) => Promise<Ingredient>;
  togglePurchasedStatus: (ingredientId: string) => Promise<Ingredient>;
}

export interface ResponseIngredientDto {
  ingredient: IngredientDto;
}
