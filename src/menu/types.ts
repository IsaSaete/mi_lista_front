export type MenuType = "comida" | "cena";

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  createdAt: Date;
}
