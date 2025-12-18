import { useEffect, useState } from "react";
import { type DayOfWeek, type EditingMeal, type MealType } from "@/menu/types";
import PageTitle from "@/menu/components/PageTitle/PageTitle";
import DaySelector from "../../components/DaySelector/DaySelector";
import MenuSection from "@/menu/weeklyMenu/components/MenuSection/MenuSection";
import useWeeklyMenu from "../../hooks/useWeeklyMenu";
import FormModal from "@/UI/components/Modal/FormModal";
import MenuForm from "../../components/MenuForm/MenuForm";
import { dayLabels, mealTypeLabels } from "../../mapper/mappersMenu";
import { useSearchParams } from "react-router";
import useShoppingList from "@/menu/shoppingList/hooks/useShoppingList";
import IngredientMenuForm from "../../components/IngredientMenuForm/IngredientMenuForm";

type ModalType = "none" | "editMeal" | "addIngredients";

const MenuPage: React.FC = () => {
  const { addIngredient } = useShoppingList();
  const { weeklyMenu, loadWeeklyMenu } = useWeeklyMenu();
  const [selectedMeal, setSelectedMeal] = useState<EditingMeal>({
    day: "L",
    mealType: "lunch",
  });
  const [activeModal, setActiveModal] = useState<ModalType>("none");
  const [searchParams, setSearchParams] = useSearchParams();
  const day = (searchParams.get("day") as DayOfWeek) || "L";

  const handleDaySelect = (selectedDay: DayOfWeek) => {
    setSearchParams({ day: selectedDay });
  };

  const handleEditMeal = (day: DayOfWeek, mealType: MealType) => {
    setSelectedMeal({ day, mealType });
    setActiveModal("editMeal");
  };

  const handleAddIngredients = (day: DayOfWeek, mealType: MealType) => {
    setSelectedMeal({ day, mealType });
    setActiveModal("addIngredients");
  };

  const handleCloseModal = () => {
    setActiveModal("none");
  };

  useEffect(() => {
    loadWeeklyMenu();
  }, [loadWeeklyMenu]);

  return (
    <>
      <PageTitle title="Menú semanal" />
      <DaySelector selectedDay={day} onDaySelect={handleDaySelect} />
      <MenuSection
        mealType="lunch"
        meal={weeklyMenu[day].lunch}
        onEdit={() => handleEditMeal(day, "lunch")}
        addIngredients={() => handleAddIngredients(day, "lunch")}
      />
      <MenuSection
        mealType="dinner"
        meal={weeklyMenu[day].dinner}
        onEdit={() => handleEditMeal(day, "dinner")}
        addIngredients={() => handleAddIngredients(day, "dinner")}
      />
      {activeModal === "editMeal" && selectedMeal && (
        <FormModal
          key={`menu-${selectedMeal.day}-${selectedMeal.mealType}`}
          title="Formulario para editar menú"
          description={`Editar menú de: ${mealTypeLabels[selectedMeal.mealType]} - ${dayLabels[selectedMeal.day]}`}
          isOpen={activeModal === "editMeal"}
        >
          <MenuForm
            selectedDay={selectedMeal.day}
            selectedMealType={selectedMeal.mealType}
            onClose={handleCloseModal}
            weeklyMenu={weeklyMenu}
          />
        </FormModal>
      )}
      {activeModal === "addIngredients" && selectedMeal && (
        <FormModal
          key={`ingredients-${selectedMeal.day}-${selectedMeal.mealType}`}
          title="Añadir ingredientes"
          description={`Añadir ingredientes para: ${mealTypeLabels[selectedMeal.mealType]} - ${dayLabels[selectedMeal.day]}`}
          isOpen={activeModal === "addIngredients"}
        >
          <IngredientMenuForm
            selectedDay={selectedMeal.day}
            selectedMealType={selectedMeal.mealType}
            weeklyMenu={weeklyMenu}
            onClose={handleCloseModal}
            addIngredient={addIngredient}
          />
        </FormModal>
      )}
    </>
  );
};

export default MenuPage;
