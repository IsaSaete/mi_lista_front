import type { Ingredient } from "@/menu/types";

export const tomato: Ingredient = {
  id: "1",
  name: "Tomate",
  category: "Verdura",
  createdAt: new Date("2025-10-01T10:00:00Z"),
};

export const aceite: Ingredient = {
  id: "2",
  name: "Aceite de oliva virgen extra",
  category: "Aceite",
  createdAt: new Date("2025-10-02T12:15:00Z"),
};
export const espagueti: Ingredient = {
  id: "3",
  name: "Pasta espagueti",
  category: "Cereal",
  createdAt: new Date("2025-10-03T09:30:00Z"),
};
export const albahaca: Ingredient = {
  id: "4",
  name: "Albahaca fresca",
  category: "Hierba aromática",
  createdAt: new Date("2025-10-05T08:45:00Z"),
};
export const parmesano: Ingredient = {
  id: "5",
  name: "Queso parmesano",
  category: "Lácteo",
  createdAt: new Date("2025-10-06T17:20:00Z"),
};

export const ingredientsPrueba: Ingredient[] = [
  tomato,
  aceite,
  espagueti,
  albahaca,
  parmesano,
];
