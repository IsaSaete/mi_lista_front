import type { Ingredient, IngredientSendFormData } from "@/menu/types";
import type {
  ResponseIngredientDto,
  ShoppingListClientStructure,
} from "./types";
import {
  mapIngredientDtoToIngredient,
  mapIngredientsDtotoIngredients,
} from "../dto/mapper";
import type { ShoppingListDto } from "../dto/types";

class ShoppingListClient implements ShoppingListClientStructure {
  private readonly apiUrl = import.meta.env.VITE_API_URL;

  public getShoppingList = async (): Promise<Ingredient[]> => {
    const response = await fetch(`${this.apiUrl}/shopping-list`);

    if (!response.ok) {
      throw new Error("Error fetching shopping list");
    }

    const shoppingListData = (await response.json()) as {
      shoppingList: ShoppingListDto;
    };

    const ingredients = mapIngredientsDtotoIngredients(
      shoppingListData.shoppingList.ingredients,
    );

    return ingredients;
  };

  public addIngredient = async (
    ingredientName: IngredientSendFormData,
  ): Promise<Ingredient> => {
    const response = await fetch(`${this.apiUrl}/shopping-list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: ingredientName.name }),
    });
    if (!response.ok) {
      throw new Error("Error adding new ingredient");
    }
    const { ingredient } = (await response.json()) as ResponseIngredientDto;

    const newIngredient = mapIngredientDtoToIngredient(ingredient);

    return newIngredient;
  };

  public togglePurchasedStatus = async (
    ingredientId: string,
  ): Promise<Ingredient> => {
    const response = await fetch(
      `${this.apiUrl}/shopping-list/ingredients/${ingredientId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      throw new Error(
        "Failed to change the isPurchased property of ingredient",
      );
    }

    const { ingredient } = (await response.json()) as ResponseIngredientDto;

    const updatedIngredient = mapIngredientDtoToIngredient(ingredient);

    return updatedIngredient;
  };

  public deleteIngredient = async (
    ingredientId: string,
  ): Promise<Ingredient> => {
    const response = await fetch(
      `${this.apiUrl}/shopping-list/ingredients/${ingredientId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      throw new Error("Error deleting ingredient");
    }

    const { ingredient } = (await response.json()) as ResponseIngredientDto;

    const deletedIngredient = mapIngredientDtoToIngredient(ingredient);

    return deletedIngredient;
  };
}

export default ShoppingListClient;
