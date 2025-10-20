import type { Ingredient } from "@/menu/types";

export interface ShoppingListClientStructure {
  getShoppingList: () => Promise<Ingredient[]>;
}
