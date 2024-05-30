import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

import {RecipeListComponent} from "./recipe-list";
import {RecipeDetailComponent} from "./recipe-detail";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  standalone: true,
  imports: [
    RecipeListComponent,
    RecipeDetailComponent,
    RouterOutlet
  ],
})
export class RecipesComponent {
}
