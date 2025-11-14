import PageTitle from "@/menu/components/PageTitle/PageTitle";
import DaySelector from "../../components/DaySelector/DaySelector";
import MenuSection from "@/menu/weeklyMenu/components/MenuSection/MenuSection";
import { useEffect, useState } from "react";
import type { DayOfWeek } from "@/menu/types";
import useWeeklyMenu from "../../hooks/useWeeklyMenu";

const MenuPage: React.FC = () => {
  const [day, setDay] = useState<DayOfWeek>("L");
  const { weeklyMenu, loadWeeklyMenu } = useWeeklyMenu();

  useEffect(() => {
    loadWeeklyMenu();
  }, [loadWeeklyMenu]);

  return (
    <>
      <PageTitle title="Menú semanal" />
      <DaySelector selectedDay={day} onDaySelect={setDay} />
      <>
        <MenuSection mealType="lunch" meal={weeklyMenu[day].lunch} />
        <MenuSection mealType="dinner" meal={weeklyMenu[day].dinner} />
      </>
    </>
  );
};

export default MenuPage;
