export type MenuType = "comida" | "cena";

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  purchasedAt: boolean;
  createdAt: Date;
}

export type NewIngredient = Omit<Ingredient, "id" | "category" | "createdAt">;
