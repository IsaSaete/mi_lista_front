import { http, HttpResponse } from "msw";
import { shoppingListResponseFixture } from "../dto/fixturesDto";
import type { IngredientDto, ShoppingListResponseDto } from "../dto/types";

const apiUrl = import.meta.env.VITE_API_URL;

export type IngredientsResponseDto = IngredientDto[];

if (!apiUrl) {
  throw new Error("Not found");
}

export const shoppingListHandlers = [
  http.get(`${apiUrl}/shopping-list`, () => {
    return HttpResponse.json<ShoppingListResponseDto>(
      shoppingListResponseFixture,
    );
  }),
];
