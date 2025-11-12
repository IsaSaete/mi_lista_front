import type { WeeklyMenu } from "@/menu/types";
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
}

export default WeeklyMenuClient;
