import type { Ingredient } from "@/menu/types";
import type { IngredientDto } from "./types";

export const mapIngredientDtoToIngredient = ({
  _id,

  ...ingredientDto
}: IngredientDto): Ingredient => {
  const ingredient = {
    ...ingredientDto,
    id: _id,
  };

  return ingredient;
};

export const mapIngredientsDtotoIngredients = (
  ingredientsDto: IngredientDto[],
): Ingredient[] => {
  const ingredients = ingredientsDto.map<Ingredient>((ingredientDto) =>
    mapIngredientDtoToIngredient(ingredientDto),
  );

  return ingredients;
};
