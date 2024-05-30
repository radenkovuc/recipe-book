import {Component} from '@angular/core';

import {Recipe} from "../../shared/recipe.model";
import {RecipeItemComponent} from "./recipe-item/recipe-item.component";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {AppStore} from "../../store";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  standalone: true,
  imports: [
    RecipeItemComponent,
    RouterLink,
    AsyncPipe
  ],
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Observable<Recipe[]>

  constructor(private store: Store<AppStore>) {
    this.recipes = this.store.select(s => s.recipes.recipes)
  }


}
