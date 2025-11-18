import { useEffect, useState } from "react";
import { type DayOfWeek, type EditingMeal, type MealType } from "@/menu/types";
import PageTitle from "@/menu/components/PageTitle/PageTitle";
import DaySelector from "../../components/DaySelector/DaySelector";
import MenuSection from "@/menu/weeklyMenu/components/MenuSection/MenuSection";
import useWeeklyMenu from "../../hooks/useWeeklyMenu";
import FormModal from "@/UI/components/Modal/FormModal";
import MenuForm from "../../components/MenuForm/MenuForm";
import { dayLabels, mealTypeLabels } from "../../mapper/mappersMenu";

const MenuPage: React.FC = () => {
  const { weeklyMenu, loadWeeklyMenu } = useWeeklyMenu();
  const [day, setDay] = useState<DayOfWeek>("L");
  const [selectedMeal, setSelectedMeal] = useState<EditingMeal>({
    day: "L",
    mealType: "lunch",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMealSelection = (day: DayOfWeek, mealType: MealType) => {
    setSelectedMeal({ day, mealType });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderFormModal = () => {
    if (!selectedMeal) {
      return;
    }

    return (
      <FormModal
        key={
          selectedMeal
            ? `${selectedMeal.day}-${selectedMeal.mealType}`
            : "closed"
        }
        title="Formulario para editar menú"
        description={`Editar menù de: ${mealTypeLabels[selectedMeal.mealType]} - ${dayLabels[selectedMeal.day]}`}
        isOpen={isModalOpen}
      >
        {selectedMeal && (
          <MenuForm
            selectedDay={selectedMeal.day}
            selectedMealType={selectedMeal.mealType}
            onClose={handleCloseModal}
            weeklyMenu={weeklyMenu}
          />
        )}
      </FormModal>
    );
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
        onEdit={() => handleMealSelection(day, "lunch")}
      />
      <MenuSection
        mealType="dinner"
        meal={weeklyMenu[day].dinner}
        onEdit={() => handleMealSelection(day, "dinner")}
      />
      {renderFormModal()}
    </>
  );
};

export default MenuPage;
