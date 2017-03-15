import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from "../recipe";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: []
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeId: number;
  private selectedRecipe: Recipe = null;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute,
              private recipeService: RecipeService, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      this.selectedRecipe = this.recipeService.getRecipe(this.recipeId);
    })
  }

  addToShoppingList() {
    this.shoppingListService.addItems(this.selectedRecipe.ingredients);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editRecipe() {
    this.router.navigate(['/recipes', this.recipeId, 'edit']);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);
  }
}
