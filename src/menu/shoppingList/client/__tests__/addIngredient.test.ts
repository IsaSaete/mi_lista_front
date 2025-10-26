import type { IngredientSendFormData } from "@/menu/types";
import ShoppingListClient from "../ShoppingListClient";
import { mapIngredientDtoToIngredient } from "../../dto/mapper";
import { albahacaDto } from "../../dto/fixturesDto";
import { server } from "@/setupTests";
import { http, HttpResponse } from "msw";

describe("Given the addIngredient methos of ShoppingListClient", () => {
  describe("When it`s called with the name of ingredient 'Albahaca'", () => {
    test("Then it should return 'Albahaca' ingredient", async () => {
      const ingredient: IngredientSendFormData = { name: "Albahaca" };

      const shoppingListClient = new ShoppingListClient();

      const newIngredient = await shoppingListClient.addIngredient(ingredient);

      const addIngredient = mapIngredientDtoToIngredient(albahacaDto);

      expect(newIngredient).toStrictEqual(addIngredient);
    });
  });

  describe("When it's called and the server responds with an error", () => {
    test("Then it should throw an error with message 'Error adding new ingredient'", () => {
      const ingredient: IngredientSendFormData = { name: "Albahaca" };
      const expectedErrorMessage = "Error adding new ingredient";

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.post(`${apiUrl}/shopping-list`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const shoppingListClient = new ShoppingListClient();

      const newIngredient = shoppingListClient.addIngredient(ingredient);

      expect(newIngredient).rejects.toThrow(expectedErrorMessage);
    });
  });
});
