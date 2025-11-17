import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Meal, type DayOfWeek, type MealType } from "@/menu/types";
import { useState } from "react";
import { dayLabels } from "../../mapper/mappersMenu";

interface MenuFormProps {
  selectedDay: DayOfWeek;
  selectedMealType: MealType;
  onClose: () => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
  selectedDay,
  selectedMealType,
  onClose,
}) => {
  const [dayLabel, setDayLabel] = useState(dayLabels[selectedDay]);
  const [mealType, setMealType] = useState<MealType>(selectedMealType);
  const [formData, setFormData] = useState<Meal>({
    firstPlate: "",
    secondPlate: "",
    dessert: "",
  });

  const handleMealTypeChange = (value: string) => {
    setMealType(value as MealType);
  };

  const handleFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setFormData((formData) => ({ ...formData, [event.target.id]: newValue }));
  };

  return (
    <form className="bg-background border-secondary-hover border-3 text-background p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="day" className="font-medium text-xl text-foreground">
          Día de la semana
        </label>
        <Select value={dayLabel} onValueChange={setDayLabel}>
          <SelectTrigger
            id="day"
            className="w-full text-base border-2 border-secondary-hover text-foreground rounded-md focus:ring-2 focus:ring-secondary-hover focus:outline-none"
          >
            <SelectValue placeholder="Selecciona un día" />
          </SelectTrigger>
          <SelectContent
            className="bg-background border-secondary-hover border-2 shadow-2xl"
            position="popper"
          >
            <SelectGroup>
              {Object.values(dayLabels).map((label) => (
                <SelectItem
                  key={label}
                  value={label}
                  className="py-2 focus:bg-secondary-hover focus:text-background text-base"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="typeMeal"
          className="text-xl font-medium text-foreground"
        >
          Comida o cena
        </label>
        <Select value={mealType} onValueChange={handleMealTypeChange}>
          <SelectTrigger
            id="typeMeal"
            className="w-full text-base border-2 border-secondary-hover text-foreground rounded-md focus:ring-2 focus:ring-secondary-hover focus:outline-none"
          >
            <SelectValue placeholder="Selecciona el tipo" />
          </SelectTrigger>
          <SelectContent className="bg-background border-secondary-hover border-2 shadow-2xl">
            <SelectGroup>
              <SelectItem
                value="lunch"
                className="py-2 focus:bg-secondary-hover focus:text-background text-base"
              >
                Comida
              </SelectItem>
              <SelectItem
                value="dinner"
                className="py-2 focus:bg-secondary-hover focus:text-background text-base"
              >
                Cena
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3 text-xl">
        <div className="flex flex-col gap-1">
          <label htmlFor="firstPlate" className="font-medium text-foreground">
            Primer plato:
          </label>
          <input
            type="text"
            id="firstPlate"
            value={formData.firstPlate}
            onChange={handleFormData}
            className="w-full border-secondary-hover border-2 rounded-lg px-2 py-1 text-foreground shadow-md focus:outline-none focus:ring-3 focus:ring-secondary-hover text-base"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="secondPlate" className="font-medium text-foreground">
            Segundo plato:
          </label>
          <input
            type="text"
            id="secondPlate"
            value={formData.secondPlate}
            onChange={handleFormData}
            className="w-full border-secondary-hover border-2 rounded-lg px-2 py-1 text-foreground shadow-md focus:outline-none focus:ring-3 focus:ring-secondary-hover text-base"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dessert" className="font-medium text-foreground">
            Postre:
          </label>
          <input
            type="text"
            id="dessert"
            value={formData.dessert}
            onChange={handleFormData}
            className="w-full border-secondary-hover border-2 rounded-lg px-2 py-1 text-foreground shadow-md focus:outline-none focus:ring-3 focus:ring-secondary-hover text-base"
          />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button
          type="button"
          aria-label="Volver sin guardar cambios"
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-secondary-hover text-background hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-3 focus:ring-primary"
        >
          Volver
        </button>
        <button
          type="submit"
          aria-label="Guardar menú"
          className="px-4 py-2 rounded-lg bg-secondary-hover text-background hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-3 focus:ring-primary"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default MenuForm;
