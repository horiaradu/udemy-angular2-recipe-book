import { Ingredient } from "../shared/ingredient";

export class ShoppingListService {
  private items: Ingredient[] = [];

  constructor() {
  }

  getItems() {
    return this.items;
  }

  addItems(ingredients: Ingredient[]) {
    ingredients.forEach(item => this.items.push(item));
  }

  addItem(ingredient: Ingredient) {
    this.items.push(ingredient);
  }

  saveItem(oldItem: Ingredient, newItem: Ingredient) {
    this.items[this.items.indexOf(oldItem)] = newItem;
  }

  deleteItem(item: Ingredient) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
