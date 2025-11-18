import type { UpdateMeal, UpdateMealResponse, WeeklyMenu } from "@/menu/types";

export interface WeeklyMenuClientStructure {
  getWeeklyMenu: () => Promise<WeeklyMenu>;
  updateMeal: (menu: UpdateMeal) => Promise<UpdateMealResponse>;
}
