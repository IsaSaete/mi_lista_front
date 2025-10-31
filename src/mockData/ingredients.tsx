import type { Ingredient } from "@/menu/types";

export const tomato: Ingredient = {
  id: "14fbf39d8c9d1e4dabc5f1e2",
  name: "Tomate",
  category: "Verdura",
  createdAt: "2025-10-01T10:00:00Z",
  isPurchased: true,
};

export const aceite: Ingredient = {
  id: "14fbf39d8c9d1e4dabc5f122",
  name: "Aceite de oliva virgen extra",
  category: "Aceite",
  createdAt: "2025-10-02T12:15:00Z",
  isPurchased: false,
};
export const espagueti: Ingredient = {
  id: "314fbf39d8c9d1e4dabc5f123",
  name: "Pasta espagueti",
  category: "Cereal",
  createdAt: "2025-10-03T09:30:00Z",
  isPurchased: false,
};
export const albahaca: Ingredient = {
  id: "14fbf39d8c9d1e4dabc5f124",
  name: "Albahaca fresca",
  category: "Hierba aromática",
  createdAt: "2025-10-05T08:45:00Z",
  isPurchased: false,
};
export const parmesano: Ingredient = {
  id: "14fbf39d8c9d1e4dabc5f125",
  name: "Queso parmesano",
  category: "Lácteo",
  createdAt: "2025-10-06T17:20:00Z",
  isPurchased: false,
};

export const ingredientList: Ingredient[] = [
  tomato,
  aceite,
  espagueti,
  albahaca,
  parmesano,
];

export const shoppingList: Ingredient[] = [tomato, albahaca, parmesano];
