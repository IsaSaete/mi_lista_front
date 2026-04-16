import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageTitle from "@/menu/components/PageTitle/PageTitle";
import ShoppingList from "@/menu/shoppingList/components/ShoppingList/ShoppingList";
import IngredientForm from "../../components/IngredientForm/IngredientForm";
import useShoppingList from "../../hooks/useShoppingList";
import Loader from "@/UI/components/Loader/Loader";
import { selectSeparatedIngredients } from "../../slice/shoppingListSelector";
import type { AddIngredientStatus } from "../../hooks/useShoppingList";

type AddIngredientFeedback = {
  message: string;
  isError: boolean;
  isSrOnly: boolean;
};

const ShoppingListPage = () => {
  const { loadIngredients, isLoading, addIngredient } = useShoppingList();
  const { purchasedIngredients, toBuyIngredients } = useSelector(
    selectSeparatedIngredients,
  );
  const [addIngredientFeedback, setAddIngredientFeedback] =
    useState<AddIngredientFeedback | null>(null);

  const handleAddIngredientResult = (status: AddIngredientStatus): void => {
    if (status === "added") {
      setAddIngredientFeedback({
        message: "Ingrediente añadido a la lista de la compra",
        isError: false,
        isSrOnly: true,
      });
      return;
    }

    if (status === "duplicate") {
      setAddIngredientFeedback({
        message: "Este ingrediente ya está en la cesta",
        isError: true,
        isSrOnly: false,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }

    setAddIngredientFeedback(null);
  };

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients]);

  return (
    <>
      <PageTitle title="lista de la compra" />
      {isLoading ? (
        <Loader message="Cargando ingredientes por comprar" />
      ) : (
        <>
          {addIngredientFeedback && (
            <p
              className={`mt-2 text-center text-sm ${
                addIngredientFeedback.isError
                  ? "text-error"
                  : addIngredientFeedback.isSrOnly
                    ? "sr-only"
                    : ""
              }`}
              role={addIngredientFeedback.isError ? "alert" : "status"}
              aria-live={addIngredientFeedback.isError ? "assertive" : "polite"}
            >
              {addIngredientFeedback.message}
            </p>
          )}
          <ShoppingList
            ingredients={toBuyIngredients}
            variant="notPurchased"
            title="Ingredientes por comprar:"
          />
        </>
      )}
      {isLoading ? (
        <Loader message="Cargando ingredientes ya comprados" />
      ) : (
        purchasedIngredients.length !== 0 && (
          <ShoppingList
            ingredients={purchasedIngredients}
            variant="purchased"
            title="Ingredientes comprados:"
          />
        )
      )}

      <IngredientForm
        addIngredient={addIngredient}
        onAddResult={handleAddIngredientResult}
        onResetFeedback={() => setAddIngredientFeedback(null)}
      />
    </>
  );
};

export default ShoppingListPage;
