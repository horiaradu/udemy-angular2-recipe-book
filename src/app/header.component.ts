import { Component, OnInit } from '@angular/core';
import { RecipeService } from "./recipes/recipe.service";
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(private recipeService: RecipeService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(result => this.isAuthenticated = result);
  }

  onStore() {
    this.recipeService.storeData()
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
  }

  onFetch() {
    this.recipeService.fetchData();
  }

  signout() {
    this.authService.signout();
  }
}
