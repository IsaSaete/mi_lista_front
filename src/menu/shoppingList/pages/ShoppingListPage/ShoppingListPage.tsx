import { useEffect } from "react";
import PageTitle from "@/menu/components/PageTitle/PageTitle";
import ShoppingList from "@/menu/shoppingList/components/ShoppingList/ShoppingList";
import IngredientForm from "../../components/IngredientForm/IngredientForm";
import useShoppingList from "../../hooks/useShoppingList";
import Loader from "@/UI/components/Loader/Loader";
import { useSelector } from "react-redux";
import { selectSeparatedIngredients } from "../../slice/shoppingListSelector";

const ShoppingListPage = () => {
  const { loadIngredients, isLoading, addIngredient } = useShoppingList();
  const { purchasedIngredients, toBuyIngredients } = useSelector(
    selectSeparatedIngredients,
  );

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients]);

  return (
    <>
      <PageTitle title="lista de la compra" />
      {isLoading ? (
        <Loader message="Cargando ingredientes por comprar" />
      ) : (
        <ShoppingList
          ingredients={toBuyIngredients}
          variant="notPurchased"
          title="Ingredientes por comprar:"
        />
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

      <IngredientForm addIngredient={addIngredient} />
    </>
  );
};

export default ShoppingListPage;
