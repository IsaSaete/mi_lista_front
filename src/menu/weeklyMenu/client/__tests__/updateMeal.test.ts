import { server } from "@/setupTests";
import { mondayLunch, mondayLunchDto } from "../../fixtures/recipes";
import WeeklyMenuClient from "../WeeklyMenuClient";
import { http, HttpResponse } from "msw";

describe("Given the updateMeal method of WeeklyMenuClient", () => {
  describe("When it's called with Monday`s lunch data", () => {
    test("Then it should return Monday`s lunch new data", async () => {
      const weeklyMenuClient = new WeeklyMenuClient();

      const mealUpdate = await weeklyMenuClient.updateMeal(mondayLunch);

      expect(mealUpdate).toStrictEqual(mondayLunchDto);
    });
  });

  describe("When it's called and the server responds with an error", () => {
    test("Then it should throw an error with message 'Error updating meal'", async () => {
      const expectedErrorMessage = "Error updating meal";

      const apiUrl = import.meta.env.VITE_API_URL;

      server.use(
        http.post(`${apiUrl}/weekly-menu`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const weeklyMenuClient = new WeeklyMenuClient();

      const updateMeal = weeklyMenuClient.updateMeal(mondayLunch);

      expect(updateMeal).rejects.toThrow(expectedErrorMessage);
    });
  });
});
