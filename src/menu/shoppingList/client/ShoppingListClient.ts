import type { Ingredient } from "@/menu/types";
import type { ShoppingListClientStructure } from "./types";
import { mapIngredientsDtotoIngredients } from "../dto/mapper";
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
}

export default ShoppingListClient;
