import { weeklyMenuData } from "../../fixtures/receipes";
import WeeklyMenuClient from "../WeeklyMenuClient";

describe("Given the getWeeklyMenu methos of WeekluMenuClient", () => {
  describe("When it's called", () => {
    test("Then it should return the data from the menus for week", async () => {
      const expectedWeeklyMenuData = weeklyMenuData;

      const weeklyMenuCluent = new WeeklyMenuClient();

      const menuWeekData = await weeklyMenuCluent.getWeeklyMenu();

      expect(menuWeekData).toStrictEqual(expectedWeeklyMenuData);
    });
  });
});
