import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";

import {DropdownDirective, Recipe} from "../../shared";
import {AppStore} from "../../store";
import {deleteRecipe} from "../../store/recipe";
import {addIngredients} from "../../store/shopping-list";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  standalone: true,
  imports: [
    DropdownDirective,
    RouterLink,
    AsyncPipe
  ],
})
export class RecipeDetailComponent implements OnInit {
  private store = inject(AppStore)
  private router = inject(Router)
  recipe: Recipe
  loading: Observable<boolean>


  ngOnInit() {
    this.loading = this.store.select(s => s.recipes.loading)
    this.store.select(s => s.recipes.selectedRecipe).subscribe(recipe => this.recipe = recipe)
  }

  addIngredients = () =>
    this.store.dispatch(addIngredients({ingredients: this.recipe.ingredients}))

  delete = () => {
    this.store.dispatch(deleteRecipe({id: this.recipe.id}));
    this.router.navigate(['recipes']);
  }
}
