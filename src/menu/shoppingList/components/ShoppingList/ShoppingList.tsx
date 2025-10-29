import type { Ingredient } from "@/menu/types";
import useShoppingList from "../../hooks/useShoppingList";

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
  const { togglePurchasedStatus } = useShoppingList();

  const handleToggle = (ingredient: Ingredient) => {
    togglePurchasedStatus(ingredient.id);
  };

  const sectionClass =
    variant === "purchased" ? "bg-secondary" : "bg-secondary-hover ";

  const textClass = variant === "purchased" ? "text-foreground" : "text-white";

  return (
    <>
      {title && <h3 className="pt-4 pb-0.5 font-medium">{title}</h3>}
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
                className="flex w-full bg-background rounded-xl items-stretch"
              >
                <button
                  onClick={() => handleToggle(ingredient)}
                  className=" px-3 py-0.5 text-left "
                  aria-label={
                    ingredient.isPurchased
                      ? `Añadir ${ingredient.name} a la lista`
                      : `Marcar ${ingredient.name} como comprado`
                  }
                >
                  <h3 className="text-foreground text-lg">{ingredient.name}</h3>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default ShoppingList;
