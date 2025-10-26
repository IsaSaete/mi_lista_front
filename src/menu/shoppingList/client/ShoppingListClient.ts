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

    const newIgredient = mapIngredientDtoToIngredient(ingredient);

    return newIgredient;
  };
}

export default ShoppingListClient;
