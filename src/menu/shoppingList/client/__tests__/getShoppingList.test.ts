import { http, HttpResponse } from "msw";
import { ingredientsDto } from "../../dto/fixturesDto";
import { mapIngredientsDtotoIngredients } from "../../dto/mapper";
import ShoppingListClient from "../ShoppingListClient";
import { server } from "@/setupTests";

describe("Given the getShoppingList method of ShoppinListClient", () => {
  describe("When it's called", () => {
    test("Then it should return'Tomate, Aceite de oliva, Pasta espagueti & Queso Parmesano' ingredients", async () => {
      const expectedIngredients =
        mapIngredientsDtotoIngredients(ingredientsDto);

      const shoppinListClient = new ShoppingListClient();

      const ingredientsList = await shoppinListClient.getShoppingList();

      expect(ingredientsList).toStrictEqual(expectedIngredients);
    });
  });

  describe("When it's called and the sercer respond with an error", () => {
    test("Then it should throw an error with message 'Error fetching shopping list'", () => {
      const expectedErrorMessage = /error fetching shopping list/i;

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.get(`${apiUrl}/shopping-list`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const shoppinListClient = new ShoppingListClient();

      const ingredientsList = shoppinListClient.getShoppingList();

      expect(ingredientsList).rejects.toThrow(expectedErrorMessage);
    });
  });
});
