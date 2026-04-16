import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import ShoppingListClient from "../client/ShoppingListClient";
import {
  addIngredientCreator,
  deletedIngredientCreator,
  loadIngredientsCreator,
  togglePurchasedStatusOptimisticCreator,
  updateIngredientFromServerCreator,
} from "../slice/shoppingListSlice";
import type { IngredientSendFormData } from "@/menu/types";
import showToast from "@/UI/toast/showToast";
import { DuplicateIngredientError } from "../client/duplicateIngredientError";

export type AddIngredientStatus = "added" | "duplicate" | "error";

const normalizeIngredientName = (name: string): string =>
  name.trim().toLowerCase();

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
      showToast(
        "error",
        "No se han podido cargar los ingredientes",
        "Inténtelo de nuevo",
      );
    }
  }, [shoppingListClient, dispatch]);

  const addIngredient = useCallback(
    async (
      ingredientName: IngredientSendFormData,
    ): Promise<AddIngredientStatus> => {
      const targetName = normalizeIngredientName(ingredientName.name);

      if (
        ingredients.some(
          (ingredient) =>
            normalizeIngredientName(ingredient.name) === targetName,
        )
      ) {
        return "duplicate";
      }

      try {
        const newIngredient =
          await shoppingListClient.addIngredient(ingredientName);

        dispatch(addIngredientCreator(newIngredient));
        return "added";
      } catch (error) {
        if (error instanceof DuplicateIngredientError) {
          return "duplicate";
        }

        showToast(
          "error",
          "Error al añadir el ingrediente",
          "Inténtelo de nuevo",
        );

        return "error";
      }
    },

    [dispatch, shoppingListClient, ingredients],
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
      showToast(
        "error",
        "Error al modificar el ingrediente",
        "Inténtelo de nuevo",
      );

      dispatch(updateIngredientFromServerCreator(ingredientBeforeToggle));
    }
  };

  const deleteIngredientById = async (ingredientId: string): Promise<void> => {
    try {
      const deletedIngredient =
        await shoppingListClient.deleteIngredient(ingredientId);

      dispatch(deletedIngredientCreator(deletedIngredient.id));

      showToast("success", "Ingrediente eliminado");
    } catch {
      showToast(
        "error",
        "El ingrediente no se ha podido eliminar",
        "Inténtelo de nuevo",
      );
    }
  };

  return {
    loadIngredients,
    ingredients,
    isLoading,
    addIngredient,
    togglePurchasedStatus,
    deleteIngredientById,
  };
};

export default useShoppingList;
