import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  standalone: true,
  imports: [
    RecipeListComponent,
    RecipeDetailComponent,
    RouterOutlet
  ],
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
}
