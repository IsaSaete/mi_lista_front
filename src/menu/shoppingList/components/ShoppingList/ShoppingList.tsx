import type { Ingredient } from "@/menu/types";
import useShoppingList from "../../hooks/useShoppingList";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface ShoppingListProps {
  ingredients: Ingredient[];
  title?: string;
  variant?: "purchased" | "notPurchased";
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  ingredients,
  title,
  variant,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { togglePurchasedStatus, deleteIngredientById } = useShoppingList();

  const handleToggle = (ingredient: Ingredient) => {
    togglePurchasedStatus(ingredient.id);
  };

  const handleDeleteIngredient = (ingredientId: string): void => {
    deleteIngredientById(ingredientId);
  };

  const selectedEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setIsEditing((previousState) => !previousState);
  };

  const sectionClass =
    variant === "purchased" ? "bg-secondary" : "bg-secondary-hover ";

  const textClass = variant === "purchased" ? "text-foreground" : "text-white";

  return (
    <>
      {title && (
        <div className="flex justify-between items-baseline">
          <h3 className="pt-4 pb-0.5 font-medium mx-2">{title}</h3>
          <button
            aria-label={`Editar la lista de ${title}`}
            onClick={selectedEdit}
            className="px-1 active:scale-115 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-primary rounded-2xl"
          >
            <Pencil width={20} height={20} className="mx-2" />
          </button>
        </div>
      )}
      <section className={`${sectionClass} rounded-2xl p-6 flex-1`}>
        {ingredients.length === 0 ? (
          <p role="status" className={`${textClass} text-center`}>
            No hay ingredientes en la lista
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3">
            {ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex w-full bg-background rounded-xl justify-between items-center"
              >
                <button
                  onClick={() => handleToggle(ingredient)}
                  className={`px-3 py-0.5 focus:outline-none focus:ring-4 focus:ring-primary rounded-2xl ${isEditing ? "w-auto" : "w-full justify-start"}`}
                  aria-label={
                    ingredient.isPurchased
                      ? `Marcar ${ingredient.name} para comprar`
                      : `Marcar ${ingredient.name} como comprado`
                  }
                >
                  <span className="text-lg ">{ingredient.name}</span>
                </button>
                {isEditing && (
                  <div className="flex">
                    <button
                      aria-label={`Eliminar ${ingredient.name}`}
                      className="px-3 py-0.5 active:scale-105 focus:outline-none focus:ring-4 focus:ring-primary rounded-2xl"
                      onClick={() => handleDeleteIngredient(ingredient.id)}
                    >
                      <Trash2 width={22} height={22} />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default ShoppingList;
