import type { Ingredient } from "@/menu/types";
import type { IngredientDto } from "./types";

export const mapIngredientDtoToIngredient = ({
  _id,
  createdAt,
  ...ingredientDto
}: IngredientDto): Ingredient => {
  const ingredient = {
    ...ingredientDto,
    id: _id,
    createdAt: new Date(createdAt),
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
