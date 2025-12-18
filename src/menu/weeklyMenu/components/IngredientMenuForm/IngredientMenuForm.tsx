import type {
  DayOfWeek,
  IngredientSendFormData,
  Meal,
  MealType,
  WeeklyMenu,
} from "@/menu/types";
import { useState } from "react";
import { dayLabels, mealTypeLabels } from "../../mapper/mappersMenu";

interface IngredientMenuFormProps {
  selectedDay: DayOfWeek;
  selectedMealType: MealType;
  weeklyMenu: WeeklyMenu;
  onclose: () => void;
  addIngredient: (nameIngredient: IngredientSendFormData) => void;
}

const IngredientMenuForm: React.FC<IngredientMenuFormProps> = ({
  selectedDay,
  selectedMealType,
  weeklyMenu,
  onclose,
  addIngredient,
}) => {
  const initialMealData = weeklyMenu[selectedDay]?.[selectedMealType] || {};
  const [mealData] = useState<Meal>(initialMealData);
  const [ingredientName, setIngredientName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setIngredientName(newValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedName = ingredientName.trim();
    if (!trimmedName) {
      return;
    }

    const formattedName =
      trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
    const ingredientData: IngredientSendFormData = { name: formattedName };

    setIngredientName("");

    addIngredient(ingredientData);
  };

  const dayLabel = dayLabels[selectedDay];
  const mealLabel = mealTypeLabels[selectedMealType];

  const isMealEmpty =
    !mealData ||
    (!mealData.firstPlate && !mealData.secondPlate && !mealData.dessert);

  return (
    <div className="bg-background border-secondary-hover border-3 text-background p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-3 flex flex-col gap-2">
      <h2 className="text-foreground font-bold text-center text-2xl">
        {mealLabel} {dayLabel}
      </h2>
      {isMealEmpty ? (
        <p className="text-secondary-hover italic text-center">
          {`No hay un menú para la ${mealLabel.toLowerCase()} del ${dayLabel}`}
        </p>
      ) : (
        <ul className="flex flex-col gap-3 w-full border-secondary-hover border-2 rounded-lg p-2 text-foreground text-xl">
          {Object.values(mealData).map((meal) => (
            <li key={meal}>- {meal}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mt-5">
          <label
            htmlFor="ingredientName"
            className="font-medium text-foreground text-xl"
          >
            Añadir ingrediente:
          </label>
          <input
            id="ingredientName"
            type="text"
            placeholder="Necesito..."
            value={ingredientName}
            onChange={handleChange}
            className=" border-secondary-hover border-2 rounded-xl px-4 py-2 bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-3 focus:ring-secondary-hover "
          />
        </div>
        <div className="flex justify-between pt-4">
          <button
            type="button"
            aria-label="Volver sin guardar cambios"
            onClick={onclose}
            className="px-10 py-2 rounded-lg bg-secondary-hover text-background hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-3 focus:ring-primary"
          >
            Volver
          </button>
          <button
            type="submit"
            className="px-10 py-2 rounded-lg bg-secondary-hover text-background hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-3 focus:ring-primary"
            aria-label="Añadir ingrediente"
          >
            Añadir
          </button>
        </div>
      </form>
    </div>
  );
};

export default IngredientMenuForm;
