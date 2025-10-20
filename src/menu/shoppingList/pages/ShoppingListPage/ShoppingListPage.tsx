import PageTitle from "@/menu/components/PageTitle/PageTitle";
import IngredientForm from "@/menu/shoppingList/components/IngredientForm/IngredientForm";
import ShoppingList from "@/menu/shoppingList/components/ShoppingList/ShoppingList";
import type { Ingredient } from "@/menu/types";

const ShoppingListPage = () => {
  const ingredients: Ingredient[] = [];

  return (
    <>
      <PageTitle title="lista de la compra" />
      <ShoppingList ingredients={ingredients} />
      <IngredientForm addIngredient={() => {}} />
    </>
  );
};

export default ShoppingListPage;
