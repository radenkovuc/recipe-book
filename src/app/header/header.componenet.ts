import {Component} from '@angular/core';
import {DropdownDirective} from "../shared/dropdown.directive";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiServices} from "../services/api.services";
import {RecipesService} from "../services/recipes.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    DropdownDirective,
    RouterLink,
    RouterLinkActive
  ],
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  collapsed = true;

  constructor(readonly apiServices: ApiServices, private recipesService: RecipesService, private router: Router) {
  }

  fetchRecipes(): void {
    this.apiServices.fetchData().subscribe(recipes => this.recipesService.saveRecipes(recipes))
    this.router.navigate([""])
  }

  postRecipes(): void {
    this.apiServices.saveData()
  }
}
