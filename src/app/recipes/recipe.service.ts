import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from "./recipe";
import { Ingredient } from "../shared/ingredient";
import { map } from 'rxjs/operators/map'
import { switchMap } from 'rxjs/operators/switchMap'
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty', 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 1)
    ]),
    new Recipe('Summer Salad', 'Okayish', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/beetroot-feta-grain-salad.jpg', [])
  ];

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(recipeId: number) {
    return this.recipes[recipeId];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put('https://recipe-book-dcca4.firebaseio.com/recipes.json', body, { headers });
  }

  fetchData() {
    return this.http.get<Recipe[]>('https://recipe-book-dcca4.firebaseio.com/recipes.json')
      .subscribe(data => {
        this.recipes = data;
        this.recipesChanged.emit(this.recipes);
      });
  }
}
