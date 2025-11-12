import type { WeeklyMenu } from "@/menu/types";

export interface WeeklyMenuClientStructure {
  getWeeklyMenu: () => Promise<WeeklyMenu>;
}
