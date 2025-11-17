import type { MealType, Meal } from "@/menu/types";
import useWeeklyMenu from "../../hooks/useWeeklyMenu";
import Loader from "@/UI/components/Loader/Loader";
import { mealTypeLabels } from "../../mapper/mappersMenu";

interface MenuSectionProps {
  mealType: MealType;
  meal?: Meal;
  onEdit: () => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  mealType,
  meal,
  onEdit,
}) => {
  const { isLoading } = useWeeklyMenu();

  const isMealEmpty = !meal || Object.keys(meal).length === 0;

  return (
    <div className="flex flex-col bg-secondary-hover rounded-2xl px-6 py-3 gap-4 mb-7">
      <h3 className="text-3xl uppercase font-bold text-center text-background">
        - {mealTypeLabels[mealType]} -
      </h3>
      {isLoading ? (
        <Loader message="Cargando menú" />
      ) : (
        <div className="flex flex-col gap-3 bg-background p-4 rounded-2xl text-xl font-medium">
          {isMealEmpty ? (
            <p className="text-muted-foreground italic text-center">
              {`No has añadido un menú para la ${mealTypeLabels[mealType].toLowerCase()}`}
            </p>
          ) : (
            <>
              {meal.firstPlate && (
                <div>
                  <p className="font-bold text-lg">Primero</p>
                  <p className="text-2xl">- {meal.firstPlate}</p>{" "}
                </div>
              )}
              {meal.secondPlate && (
                <div>
                  <p className="font-bold text-lg">Segundo</p>
                  <p className="text-2xl">- {meal.secondPlate}</p>{" "}
                </div>
              )}
              {meal.dessert && (
                <div>
                  <p className="font-bold text-lg">Postre</p>
                  <p className="text-2xl">- {meal.dessert}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="flex w-full justify-between">
        <button className="bg-primary hover:bg-secondary text-foreground font-semibold px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-background">
          Ingredientes
        </button>
        <button
          onClick={onEdit}
          aria-label={meal ? "Editar menú" : "Añadir menú"}
          className="bg-primary hover:bg-secondary font-semibold px-6 py-1 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-background"
        >
          {isMealEmpty ? "Añadir" : "Editar"}
        </button>
      </div>
    </div>
  );
};

export default MenuSection;
