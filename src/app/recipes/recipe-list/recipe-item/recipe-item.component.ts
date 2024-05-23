import {Component, Input} from '@angular/core';
import {Recipe} from "../../../shared/recipe.model";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input({required: true}) recipe: Recipe
}
