import {Component, OnDestroy, OnInit} from '@angular/core';

import {Recipe} from "../../shared/recipe.model";
import {RecipeItemComponent} from "./recipe-item/recipe-item.component";
import {RecipesService} from "../../services/recipes.service";
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  standalone: true,
  imports: [
    RecipeItemComponent,
    RouterLink
  ],
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = []
  subscription: Subscription;

  constructor(private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes()
    this.subscription = this.recipeService.recipesChanged.subscribe(recipes => {
      this.recipes = recipes
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
