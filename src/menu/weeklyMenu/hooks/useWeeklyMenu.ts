import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import WeeklyMenuClient from "../client/WeeklyMenuClient";
import { useCallback, useMemo } from "react";
import {
  loadWeeklyMenuCreator,
  updateMealCreator,
} from "../slice/weeklyMenuSlice";
import showToast from "@/UI/toast/showToast";
import type { UpdateMeal } from "@/menu/types";

const useWeeklyMenu = () => {
  const dispatch = useDispatch();

  const { weeklyMenu, isLoading } = useAppSelector((state) => state.weeklyMenu);

  const weeklyMenuClient = useMemo(() => new WeeklyMenuClient(), []);

  const loadWeeklyMenu = useCallback(async (): Promise<void> => {
    try {
      const weeklyMenu = await weeklyMenuClient.getWeeklyMenu();

      dispatch(loadWeeklyMenuCreator(weeklyMenu));
    } catch {
      showToast(
        "error",
        "No se ha podido cargar el menu",
        "Inténtelo de nuevo",
      );
    }
  }, [weeklyMenuClient, dispatch]);

  const updateMeal = async (meal: UpdateMeal): Promise<void> => {
    try {
      await weeklyMenuClient.updateMeal(meal);

      dispatch(updateMealCreator(meal));
    } catch {
      showToast(
        "error",
        "No se ha podido actualizar el menú",
        "Inténtelo de nuevo",
      );
    }
  };

  return { loadWeeklyMenu, weeklyMenu, isLoading, updateMeal };
};

export default useWeeklyMenu;
