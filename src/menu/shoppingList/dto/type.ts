import type { Ingredient } from "@/menu/types";

export type IngredientDto = Omit<Ingredient, "id" | "createdAt"> & {
  _id: string;
  createdAt: string;
};
