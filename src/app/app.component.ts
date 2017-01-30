import { Component } from '@angular/core';

import { HeaderComponent } from './header.component';

import { RecipesComponent } from './recipes/recipes.component';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {RecipeService} from "./recipes/recipe.service";

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipeService]
})
export class AppComponent {

}
