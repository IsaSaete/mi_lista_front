import PageTitle from "@/menu/components/PageTitle/PageTitle";
import DaySelector from "../../components/DaySelector/DaySelector";
import MenuSection from "@/menu/weeklyMenu/components/MenuSection/MenuSection";
import { useState } from "react";
import type { DayOfWeek, WeeklyMenu } from "@/menu/types";

const MenuPage: React.FC = () => {
  const [day, setDay] = useState<DayOfWeek>("L");
  const [weeklyMenu] = useState<WeeklyMenu | null>(null);

  return (
    <>
      <PageTitle title="Menú semanal" />
      <DaySelector selectedDay={day} onDaySelect={setDay} />

      {!weeklyMenu ? (
        <p className="text-2xl text-center mt-10">
          Estamos trabajando en ello, disculpe las molestias.
        </p>
      ) : (
        <>
          <MenuSection mealType="comida" meal={weeklyMenu[day].lunch!} />
          <MenuSection mealType="cena" meal={weeklyMenu[day].dinner!} />
        </>
      )}
    </>
  );
};

export default MenuPage;
