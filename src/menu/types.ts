export type MenuType = "comida" | "cena";

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  purchasedAt: boolean;
  createdAt: string;
}

export interface ShoppingList {
  id: string;
  ingredients: Ingredient[];
  updatedAt: Date;
}
