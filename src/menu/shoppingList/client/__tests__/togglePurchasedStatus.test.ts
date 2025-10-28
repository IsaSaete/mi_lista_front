import { http, HttpResponse } from "msw";
import { server } from "@/setupTests";
import ShoppingListClient from "../ShoppingListClient";
import { aceite, tomato } from "@/mockData/ingredients";

describe("Given the togglePurchasedStatus method of ShoppingListClient", () => {
  describe("When it's called with Tomato ingredient that isn`t purchased yet", () => {
    test("Then it should return Tomato ingredient as already purchased", async () => {
      const shoppingList = new ShoppingListClient();

      const ingredientUpdate = await shoppingList.togglePurchasedStatus(
        tomato.id,
      );

      expect(ingredientUpdate).toStrictEqual(tomato);
    });
  });

  describe("When it's called and the server responds with an error", () => {
    test("Then it should throw an error with message 'Failed to change the isPurchased property of ingredient'", () => {
      const expectedErrorMessage =
        "Failed to change the isPurchased property of ingredient";

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.patch(`${apiUrl}/shopping-list`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const shoppingListClient = new ShoppingListClient();

      const ingredientUpdate = shoppingListClient.togglePurchasedStatus(
        aceite.id,
      );

      expect(ingredientUpdate).rejects.toThrow(expectedErrorMessage);
    });
  });
});
