import type { Ingredient } from "@/menu/types";

interface ShoppingListProps {
  ingredients: Ingredient[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ ingredients }) => {
  return (
    <section className="bg-sage rounded-2xl p-6 mb-6 flex-1">
      {ingredients.length === 0 ? (
        <p role="status" className="text-foreground/60 text-center">
          No hay ingredientes en la lista
        </p>
      ) : (
        <ul className=" flex flex-col gap-3">
          {ingredients.map((ingredient) => (
            <li
              key={ingredient.id}
              className="flex items-center justify-between bg-background px-3 py-0.5 rounded-xl"
            >
              {<h3 className="text-foreground text-lg">{ingredient.name}</h3>}
              <button
                className="text-red-500 hover:text-red-700 font-bold text-3xl uppercase"
                aria-label={`Eliminar ${ingredient.name} de la lista`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ShoppingList;
