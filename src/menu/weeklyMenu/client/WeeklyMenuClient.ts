import type { UpdateMeal, UpdateMealResponse, WeeklyMenu } from "@/menu/types";
import type { WeeklyMenuClientStructure } from "./types";

class WeeklyMenuClient implements WeeklyMenuClientStructure {
  private readonly apiUrl = import.meta.env.VITE_API_URL;

  public getWeeklyMenu = async (): Promise<WeeklyMenu> => {
    const response = await fetch(`${this.apiUrl}/weekly-menu`);

    if (!response.ok) {
      throw new Error("Error fetching weekly menu data");
    }

    const weeklyMenuData = (await response.json()) as WeeklyMenu;

    return weeklyMenuData;
  };

  public updateMeal = async (
    newMeal: UpdateMeal,
  ): Promise<UpdateMealResponse> => {
    const response = await fetch(`${this.apiUrl}/weekly-menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMeal),
    });

    if (!response.ok) {
      throw new Error("Error updating meal");
    }

    const updateMeal = (await response.json()) as UpdateMealResponse;

    return updateMeal;
  };
}

export default WeeklyMenuClient;
