import { http, HttpResponse } from "msw";
import { parmesano } from "@/mockData/ingredients";
import ShoppingListClient from "../ShoppingListClient";
import { parmesanoDto } from "../../dto/fixturesDto";
import { mapIngredientDtoToIngredient } from "../../dto/mapper";
import { server } from "@/setupTests";

describe("Given the deleteIngredient method of ShoppingListClient", () => {
  describe("When it's called with Parmesano id", () => {
    test("Then it should return Parmesano ingredient data", async () => {
      const shoppingListClient = new ShoppingListClient();

      const deletedIngredient = await shoppingListClient.deleteIngredient(
        parmesano.id,
      );

      const ingredient = mapIngredientDtoToIngredient(parmesanoDto);

      expect(deletedIngredient).toStrictEqual(ingredient);
    });
  });

  describe("When it's called and the server responds with an error", () => {
    test("Then it should throw an error with message 'Error deleting ingredient'", () => {
      const expectedErrorMessage = "Error deleting ingredient";

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.delete(
          `${apiUrl}/shopping-list/ingredients/${parmesano.id}`,
          () => {
            return new HttpResponse(null, { status: 500 });
          },
        ),
      );

      const shoppingListClient = new ShoppingListClient();

      const deletedIngredient = shoppingListClient.deleteIngredient(
        parmesano.id,
      );

      expect(deletedIngredient).rejects.toThrow(expectedErrorMessage);
    });
  });
});
