import React, { useState } from "react";

interface IngredientFormProps {
  addIngredient: (name: string) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ addIngredient }) => {
  const [ingredientName, setIngredientName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!ingredientName) return;

    const formattedName =
      ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1);

    addIngredient(formattedName);

    setIngredientName("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientName(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary p-5 absolute bottom-0 left-0 w-full"
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
