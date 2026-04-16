export class DuplicateIngredientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateIngredientError";
    Object.setPrototypeOf(this, DuplicateIngredientError.prototype);
  }
}
