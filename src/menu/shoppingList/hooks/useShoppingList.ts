import { useAppSelector } from "@/store/hooks";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import ShoppingListClient from "../client/ShoppingListClient";
import {
  addIngredientCreator,
  loadIngredientsCreator,
  startLoadingIngredientsCreator,
} from "../slice/shoppingListSlice";
import type { IngredientSendFormData } from "@/menu/types";

const useShoppingList = () => {
  const dispatch = useDispatch();
  const { ingredients, isLoading } = useAppSelector(
    (state) => state.shoppingList,
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

  const addIngredient = useCallback(
    async (ingredientName: IngredientSendFormData): Promise<void> => {
      try {
        const addIngredient =
          await shoppingListClient.addIngredient(ingredientName);
        dispatch(addIngredientCreator(addIngredient));
      } catch {
        throw Error;
      }
    },

    [dispatch, shoppingListClient],
  );

  return { loadIngredients, ingredients, isLoading, addIngredient };
};

export default useShoppingList;
