import type { IngredientDto, ShoppingListResponseDto } from "./types";

export const tomatoDto: IngredientDto = {
  _id: "1",
  name: "Tomate",
  category: "Verdura",
  createdAt: "2025-10-01T10:00:00Z",
  purchasedAt: false,
};

export const aceiteDto: IngredientDto = {
  _id: "2",
  name: "Aceite de oliva virgen extra",
  category: "Aceite",
  createdAt: "2025-10-02T12:15:00Z",
  purchasedAt: false,
};
export const espaguetiDto: IngredientDto = {
  _id: "3",
  name: "Pasta espagueti",
  category: "Cereal",
  createdAt: "2025-10-03T09:30:00Z",
  purchasedAt: false,
};
export const albahacaDto: IngredientDto = {
  _id: "4",
  name: "Albahaca",
  category: "Hierba aromática",
  createdAt: "2025-10-05T08:45:00Z",
  purchasedAt: false,
};
export const parmesanoDto: IngredientDto = {
  _id: "5",
  name: "Queso parmesano",
  category: "Lácteo",
  createdAt: "2025-10-06T17:20:00Z",
  purchasedAt: false,
};

export const ingredientsDto: IngredientDto[] = [
  tomatoDto,
  aceiteDto,
  espaguetiDto,
  albahacaDto,
  parmesanoDto,
];

export const shoppingListResponseFixture: ShoppingListResponseDto = {
  shoppingList: {
    _id: "68f29689bd26659c6fbe3e07",
    ingredients: ingredientsDto,
    updatedAt: "2025-10-17T19:18:33.159Z",
  },
};
