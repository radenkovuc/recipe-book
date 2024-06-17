import {Component, input, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

import {Recipe} from "../../../shared";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
})
export class RecipeItemComponent {
  recipe= input.required<Recipe>();
}
