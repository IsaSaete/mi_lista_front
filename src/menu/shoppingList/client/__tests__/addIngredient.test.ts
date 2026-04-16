import { http, HttpResponse } from "msw";
import type { IngredientSendFormData } from "@/menu/types";
import ShoppingListClient from "../ShoppingListClient";
import { mapIngredientDtoToIngredient } from "../../dto/mapper";
import { albahacaDto } from "../../dto/fixturesDto";
import { server } from "@/setupTests";
import { DuplicateIngredientError } from "../duplicateIngredientError";

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

  describe("When the server responds with 409 conflict", () => {
    test("Then it should throw DuplicateIngredientError with the server message", async () => {
      const ingredient: IngredientSendFormData = { name: "Albahaca" };
      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.post(`${apiUrl}/shopping-list`, () => {
          return HttpResponse.json(
            { error: "Este ingrediente ya está en la lista" },
            { status: 409 },
          );
        }),
      );

      const shoppingListClient = new ShoppingListClient();

      const error = await shoppingListClient
        .addIngredient(ingredient)
        .catch((caught: unknown) => caught);

      expect(error).toBeInstanceOf(DuplicateIngredientError);
      expect((error as Error).message).toBe(
        "Este ingrediente ya está en la lista",
      );
    });
  });

  describe("When it's called and the server responds with an error", () => {
    test("Then it should throw an error with message 'Error adding new ingredient'", async () => {
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

      await expect(newIngredient).rejects.toThrow(expectedErrorMessage);
    });
  });
});
