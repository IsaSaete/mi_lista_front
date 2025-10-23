import { useAppSelector } from "@/store/hooks";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import ShoppingListClient from "../client/ShoppingListClient";
import {
  loadIngredientsCreator,
  startLoadingIngredientsCreator,
} from "../slice/shoppingListSlice";

const useShoppingList = () => {
  const dispatch = useDispatch();
  const { ingredients, isLoading } = useAppSelector(
    (state) => state.shoppinglist,
  );

  const shoppingListClient = useMemo(() => new ShoppingListClient(), []);

  const loadIngredients = useCallback(async (): Promise<void> => {
    dispatch(startLoadingIngredientsCreator());

    try {
      const ingredientsList = await shoppingListClient.getShoppingList();
      dispatch(loadIngredientsCreator(ingredientsList));
    } catch {
      dispatch(loadIngredientsCreator([]));
    }
  }, [shoppingListClient, dispatch]);

  return { loadIngredients, ingredients, isLoading };
};

export default useShoppingList;
