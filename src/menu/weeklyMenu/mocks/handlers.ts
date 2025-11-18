import { type UpdateMealResponse, type WeeklyMenu } from "@/menu/types";
import { http, HttpResponse } from "msw";
import { mondayLunchDto, weeklyMenuData } from "../fixtures/recipes";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("Not found");
}

export const weeklyMenuHandlers = [
  http.get(`${apiUrl}/weekly-menu`, () => {
    return HttpResponse.json<WeeklyMenu>(weeklyMenuData);
  }),

  http.post(`${apiUrl}/weekly-menu`, () => {
    return HttpResponse.json<UpdateMealResponse>(mondayLunchDto);
  }),
];
