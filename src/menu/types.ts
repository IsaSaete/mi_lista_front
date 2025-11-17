export interface Ingredient {
  id: string;
  name: string;
  category: string;
  isPurchased: boolean;
  createdAt: string;
}

export interface ShoppingList {
  id: string;
  ingredients: Ingredient[];
  updatedAt: Date;
}

export type IngredientSendFormData = Omit<
  Ingredient,
  "id" | "category" | "isPurchased" | "createdAt"
>;

export type MealType = "lunch" | "dinner";

export type DayOfWeek = "L" | "M" | "X" | "J" | "V" | "S" | "D";
export interface Meal {
  firstPlate?: string;
  secondPlate?: string;
  dessert?: string;
}

export interface DayMenu {
  lunch?: Meal;
  dinner?: Meal;
}

export type WeeklyMenu = Record<DayOfWeek, DayMenu>;

export type EditingMeal = {
  day: DayOfWeek;
  mealType: MealType;
};
