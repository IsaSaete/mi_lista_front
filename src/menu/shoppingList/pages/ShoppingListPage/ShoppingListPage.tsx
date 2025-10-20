import PageTitle from "@/menu/components/PageTitle/PageTitle";
import ShoppingList from "@/menu/shoppingList/components/ShoppingList/ShoppingList";
import type { Ingredient } from "@/menu/types";

import { useEffect, useState } from "react";
import ShoppingListClient from "../../client/ShoppingListClient";
import IngredientForm from "../../components/IngredientForm/IngredientForm";

const shoppingListClient = new ShoppingListClient();

const ShoppingListPage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const data = await shoppingListClient.getShoppingList();
      setIngredients(data);
    };

    fetchIngredients();
  }, []);

  return (
    <>
      <PageTitle title="lista de la compra" />
      <ShoppingList ingredients={ingredients} />
      <IngredientForm addIngredient={() => {}} />
    </>
  );
};

export default ShoppingListPage;
