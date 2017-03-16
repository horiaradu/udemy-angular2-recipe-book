import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs";
import { Recipe } from "../recipe";
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: []
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeId: number;
  private recipe: Recipe;
  private isNew = true;
  private recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: any) => {
      if (params.hasOwnProperty('id')) {
        this.isNew = false;
        this.recipeId = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.recipeId);
      } else {
        this.isNew = true;
        this.recipe = null;
      }

      this.initForm();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients = new FormArray([]);

    if (!this.isNew) {
      this.recipe.ingredients.forEach(ingredient => {
        recipeIngredients.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern("\\d+")])
        }));
      });
      recipeName = this.recipe.name;
      recipeContent = this.recipe.description;
      recipeImageUrl = this.recipe.imagePath;
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }

    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }

  onRemoveIngredient(ingredientId) {
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(ingredientId);
  }

  onAddIngredient(name, amount) {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [Validators.required, Validators.pattern("\\d+")])
      })
    )
  }

  private navigateBack() {
    this.router.navigate(['../']);
  }
}
