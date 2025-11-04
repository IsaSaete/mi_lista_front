import PageTitle from "@/menu/components/PageTitle/PageTitle";
import DaySelector from "../../components/DaySelector/DaySelector";
import MenuSection from "@/menu/weeklyMenu/components/MenuSection/MenuSection";
import { useState } from "react";
import type { DayOfWeek } from "@/menu/types";

const MenuPage: React.FC = () => {
  const [day, setDay] = useState<DayOfWeek>("L");
  // const [weeklyMenu] = useState<WeeklyMenu | null>(null);

  return (
    <>
      <PageTitle title="Menú semanal" />
      <DaySelector selectedDay={day} onDaySelect={setDay} />

      <>
        <MenuSection mealType="comida" />
        <MenuSection mealType="cena" />
      </>
    </>
  );
};

export default MenuPage;
