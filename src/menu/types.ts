import type { IngredientDto } from "./shoppingList/dto/type";

export type MenuType = "comida" | "cena";

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  purchasedAt: boolean;
  createdAt: Date;
}

export interface ShoppingList {
  _id: string;
  ingredients: IngredientDto[];
}
