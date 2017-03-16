import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Ingredient } from "../shared/ingredient";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styles: []
})
export class ShoppingListAddComponent implements OnInit, OnChanges {
  isAdd = true;
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
    if (changes.item.currentValue === null) {
      this.isAdd = true;
      this.item = new Ingredient(null, null);
    } else {
      this.isAdd = false;
    }
  }

  onSubmit(value: Ingredient) {
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.isAdd) {
      this.item = newIngredient;
      this.shoppingListService.addItem(this.item);
    } else {
      this.shoppingListService.saveItem(this.item, newIngredient);
    }
    this.onClear();
  }

  onDelete() {
    this.shoppingListService.deleteItem(this.item);
    this.onClear();
  }

  onClear() {
    this.isAdd = true;
    this.cleared.emit(null);
  }

}
