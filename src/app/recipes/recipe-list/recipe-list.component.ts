import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

import {Recipe} from "../../shared";
import {RecipeItemComponent} from "./recipe-item";
import {AppStore} from "../../store";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  standalone: true,
  imports: [
    RecipeItemComponent,
    RouterLink,
    AsyncPipe
  ],
})
export class RecipeListComponent {
  recipes: Observable<Recipe[]>

  constructor(private store: AppStore) {
    this.recipes = this.store.select(s => s.recipes.recipes)
  }


}
