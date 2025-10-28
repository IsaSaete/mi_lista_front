import { useEffect } from "react";
import PageTitle from "@/menu/components/PageTitle/PageTitle";
import ShoppingList from "@/menu/shoppingList/components/ShoppingList/ShoppingList";
import IngredientForm from "../../components/IngredientForm/IngredientForm";
import useShoppingList from "../../hooks/useShoppingList";
import Loader from "@/UI/components/Loader/Loader";

const ShoppingListPage = () => {
  const { ingredients, loadIngredients, isLoading, addIngredient } =
    useShoppingList();

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients]);

  const ingredientsNotPurchased = ingredients.filter(
    (ingredient) => !ingredient.isPurchased,
  );

  const ingredientsPurchased = ingredients
    .filter((ingredient) => ingredient.isPurchased)
    .slice(-6)
    .reverse();

  return (
    <>
      <PageTitle title="lista de la compra" />
      {isLoading ? (
        <Loader message="Cargando ingredientes" />
      ) : (
        <ShoppingList
          ingredients={ingredientsNotPurchased}
          variant="notPurchased"
        />
      )}
      <ShoppingList
        ingredients={ingredientsPurchased}
        variant="purchased"
        title="Comprados recientemente:"
      />
      <IngredientForm addIngredient={addIngredient} />
    </>
  );
};

export default ShoppingListPage;
