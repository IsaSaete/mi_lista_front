import type { WeeklyMenu } from "@/menu/types";

export interface WeeklyMenuState {
  weeklyMenu: WeeklyMenu;
  isLoading?: boolean;
}
