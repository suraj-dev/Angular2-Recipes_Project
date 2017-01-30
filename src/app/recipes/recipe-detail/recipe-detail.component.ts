import {Component, OnInit, Input, OnDestroy} from '@angular/core';

import { Recipe } from '../recipe';
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  private subscription: Subscription;
  private recipeIndex: number;

  constructor(private sls: ShoppingListService,
              private route: ActivatedRoute,
              private recipesService: RecipeService,
              private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        this.selectedRecipe = this.recipesService.getRecipe(this.recipeIndex);
      }
    );
  }

  OnAddToShoppingList() {
    this.sls.addItems(this.selectedRecipe.ingredients);
  }

  OnEdit() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }

  OnDelete() {
    this.recipesService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
