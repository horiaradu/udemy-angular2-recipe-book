import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../shared/ingredient";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styles: []
})
export class ShoppingListAddComponent implements OnInit {
  isAdd = true;
  item: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
  }

  onSubmit(value: Ingredient) {
    if (this.isAdd) {
      this.item = new Ingredient(value.name, value.amount);
      this.shoppingListService.addItem(this.item);
    } else {
    }
  }

}
