import PageTitle from "@/menu/components/PageTitle/PageTitle";
import ShoppingList from "@/menu/shoppingList/components/ShoppingList/ShoppingList";
import IngredientForm from "../../components/IngredientForm/IngredientForm";
import { useEffect } from "react";
import useShoppingList from "../../hooks/useShoppingList";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const ShoppingListPage = () => {
  const { ingredients, loadIngredients, isLoading } = useShoppingList();

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients]);

  return (
    <>
      <PageTitle title="lista de la compra" />
      {isLoading ? (
        <div className="flex justify-center items-center p-5 w-fit mx-auto">
          <Button
            className="bg-secondary disabled:opacity-70 text-foreground flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-lg sm:text-2xl h-auto px-4 sm:px-6 py-2 sm:py-3 text-center"
            disabled
            size="lg"
          >
            <Spinner className="size-10 sm:size-12 animate-spin text-inherit" />
            Cargando ingredientes
          </Button>
        </div>
      ) : (
        <ShoppingList ingredients={ingredients} />
      )}
      <IngredientForm addIngredient={() => {}} />
    </>
  );
};

export default ShoppingListPage;
