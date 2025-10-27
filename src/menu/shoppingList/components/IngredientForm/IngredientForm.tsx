import type { IngredientSendFormData } from "@/menu/types";
import React, { useState } from "react";

interface IngredientFormProps {
  addIngredient: (nameIngredient: IngredientSendFormData) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ addIngredient }) => {
  const [ingredientName, setIngredientName] = useState("");

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setIngredientName(newValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" fixed bottom-0  w-full max-w-[500px] left-1/2 -translate-x-1/2 z-1 bg-primary p-5"
    >
      <div className="container mx-auto max-w-md flex items-center gap-3">
        <label htmlFor="ingredientName" className="sr-only">
          Nombre del ingrediente
        </label>
        <input
          id="ingredientName"
          type="text"
          value={ingredientName}
          onChange={handleChange}
          placeholder="Necesito..."
          className="flex-1 px-4 py-3 rounded-full bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-3 focus:ring-secondary-hover "
        />

        <button
          type="submit"
          className="w-12 h-12 rounded-full bg-secondary-hover hover:bg-secondary hover:text-gray-950 flex items-center justify-center text-white font-bold text-3xl transition-colors focus:outline-none focus:ring-3 focus:ring-background"
          aria-label="Añadir ingrediente"
        >
          +
        </button>
      </div>
    </form>
  );
};

export default IngredientForm;
