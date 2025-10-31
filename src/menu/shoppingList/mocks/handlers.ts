import { http, HttpResponse } from "msw";
import {
  albahacaDto,
  parmesanoDto,
  shoppingListResponseFixture,
  tomatoDto,
} from "../dto/fixturesDto";
import type { IngredientDto, ShoppingListResponseDto } from "../dto/types";
import { parmesano } from "@/mockData/ingredients";

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

  http.post(`${apiUrl}/shopping-list`, () => {
    return HttpResponse.json<{ ingredient: IngredientDto }>({
      ingredient: albahacaDto,
    });
  }),

  http.patch(`${apiUrl}/shopping-list/ingredients/${tomatoDto._id}`, () => {
    return HttpResponse.json<{ ingredient: IngredientDto }>({
      ingredient: { ...tomatoDto, isPurchased: true },
    });
  }),

  http.delete(`${apiUrl}/shopping-list/ingredients/${parmesano.id}`, () => {
    return HttpResponse.json<{ ingredient: IngredientDto }>({
      ingredient: parmesanoDto,
    });
  }),
];
