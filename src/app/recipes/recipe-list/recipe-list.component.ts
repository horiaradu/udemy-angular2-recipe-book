import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from "../recipe";

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  recipe = new Recipe('dummy', 'dummy', 'https://i2.wp.com/www.themakeupdummy.com/wp-content/uploads/2016/11/healthy-Nutella-Granola-recipe-by-The-Makeup-Dummy.jpg');

  constructor() {
  }

  ngOnInit() {
  }

}
