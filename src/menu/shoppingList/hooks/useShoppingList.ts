import { useAppSelector } from "@/store/hooks";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import ShoppingListClient from "../client/ShoppingListClient";
import {
  addIngredientCreator,
  loadIngredientsCreator,
  togglePurchasedStatusOptimisticCreator,
  updateIngredientFromServerCreator,
} from "../slice/shoppingListSlice";
import type { IngredientSendFormData } from "@/menu/types";

const useShoppingList = () => {
  const dispatch = useDispatch();
  const { ingredients, isLoading } = useAppSelector(
    (state) => state.shoppingList,
  );

  const shoppingListClient = useMemo(() => new ShoppingListClient(), []);

  const loadIngredients = useCallback(async (): Promise<void> => {
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

  const togglePurchasedStatus = async (ingredientId: string): Promise<void> => {
    const ingredientBeforeToggle = ingredients.find(
      (ingredient) => ingredient.id === ingredientId,
    );
    if (!ingredientBeforeToggle) return;

    dispatch(togglePurchasedStatusOptimisticCreator(ingredientId));

    try {
      const updatedIngredient =
        await shoppingListClient.togglePurchasedStatus(ingredientId);

      dispatch(updateIngredientFromServerCreator(updatedIngredient));
    } catch {
      dispatch(updateIngredientFromServerCreator(ingredientBeforeToggle));
    }
  };

  return {
    loadIngredients,
    ingredients,
    isLoading,
    addIngredient,
    togglePurchasedStatus,
  };
};

export default useShoppingList;
