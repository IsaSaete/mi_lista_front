import PageTitle from "@/menu/components/PageTitle/PageTitle";
import DaySelector from "../../components/DaySelector/DaySelector";
import MenuSection from "@/menu/weeklyMenu/components/MenuSection/MenuSection";
import { useEffect, useState } from "react";
import { type DayOfWeek, type EditingMeal, type MealType } from "@/menu/types";
import useWeeklyMenu from "../../hooks/useWeeklyMenu";
import FormModal from "@/UI/components/Modal/FormModal";
import MenuForm from "../../components/MenuForm/MenuForm";
import { dayLabels, mealTypeLabels } from "../../mapper/mappersMenu";

const MenuPage: React.FC = () => {
  const { weeklyMenu, loadWeeklyMenu } = useWeeklyMenu();
  const [day, setDay] = useState<DayOfWeek>("L");
  const [editingMeal, setEditingMeal] = useState<EditingMeal>({
    day: "L",
    mealType: "lunch",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (day: DayOfWeek, mealType: MealType) => {
    setEditingMeal({ day, mealType });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadWeeklyMenu();
  }, [loadWeeklyMenu]);

  return (
    <>
      <PageTitle title="Menú semanal" />
      <DaySelector selectedDay={day} onDaySelect={setDay} />
      <MenuSection
        mealType="lunch"
        meal={weeklyMenu[day].lunch}
        onEdit={() => handleEdit(day, "lunch")}
      />
      <MenuSection
        mealType="dinner"
        meal={weeklyMenu[day].dinner}
        onEdit={() => handleEdit(day, "dinner")}
      />
      <FormModal
        title="Formulario para editar menú"
        description={`Editar menù de: ${mealTypeLabels[editingMeal.mealType]} - ${dayLabels[editingMeal.day]}`}
        isOpen={isModalOpen}
      >
        {editingMeal && (
          <MenuForm
            selectedDay={editingMeal.day}
            selectedMealType={editingMeal.mealType}
            onClose={handleCloseModal}
          />
        )}
      </FormModal>
    </>
  );
};

export default MenuPage;
