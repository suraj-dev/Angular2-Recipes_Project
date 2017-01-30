import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from "./recipe";
import {Ingredient} from "../ingredient";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Dummy', 'Dummy', 'http://vignette4.wikia.nocookie.net/scribblenauts/images/4/42/Crash_Test_Dummy.png/revision/latest?cb=20130309213400', [
      new Ingredient('Cheese', 4),
      new Ingredient('Butter', 6)
    ]),
    new Recipe('Dummy2', 'Dummy2', 'http://vignette4.wikia.nocookie.net/scribblenauts/images/4/42/Crash_Test_Dummy.png/revision/latest?cb=20130309213400', [])
  ];

  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
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
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put('https://recipebook-7d4ac.firebaseio.com/recipe-book.json', body, {headers: headers});
  }

  fetchData() {
    return this.http.get('https://recipebook-7d4ac.firebaseio.com/recipe-book.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }
}
