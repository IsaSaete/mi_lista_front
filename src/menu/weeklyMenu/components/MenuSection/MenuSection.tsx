import type { MealType, Meal } from "@/menu/types";

interface MenuSectionProps {
  mealType: MealType;
  meal?: Meal;
}

const MenuSection: React.FC<MenuSectionProps> = ({ mealType, meal }) => {
  return (
    <div className="flex flex-col bg-secondary-hover rounded-2xl px-6 py-3 gap-4 mb-5">
      <h3 className="text-3xl uppercase font-bold underline text-center text-background">
        {mealType}
      </h3>
      <div className="flex flex-col gap-3 bg-background p-4 rounded-2xl text-xl font-medium">
        {!meal ? (
          <p className="text-muted-foreground italic text-center">
            Sin receta asignada
          </p>
        ) : (
          <>
            {meal.firstPlate && <p>- {meal.firstPlate}</p>}
            {meal.secondPlate && <p>- {meal.secondPlate}</p>}
            {meal.dessert && <p>- {meal.dessert}</p>}
          </>
        )}
      </div>
      <div className="flex w-full justify-between">
        <button className="bg-primary hover:bg-secondary text-foreground font-semibold px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-background">
          Ingredientes
        </button>
        <button
          aria-label={meal ? "Editar receta" : "Añadir receta"}
          className="bg-primary hover:bg-secondary font-semibold px-6 py-1 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-background"
        >
          {meal ? "Editar" : "Añadir"}
        </button>
      </div>
    </div>
  );
};

export default MenuSection;
