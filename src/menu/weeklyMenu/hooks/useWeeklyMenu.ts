import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import WeeklyMenuClient from "../client/WeeklyMenuClient";
import { useCallback, useMemo } from "react";
import { loadWeeklyMenuCreator } from "../slice/weeklyMenuSlice";
import showToast from "@/UI/toast/showToast";

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

  return { loadWeeklyMenu, weeklyMenu, isLoading };
};

export default useWeeklyMenu;
