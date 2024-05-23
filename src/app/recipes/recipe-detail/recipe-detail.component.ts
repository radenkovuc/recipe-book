import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {DropdownDirective} from "../../shared/dropdown.directive";
import {IngredientsService} from "../../services/ingreadients.service";
import {ActivatedRoute, Data, Router, RouterLink} from "@angular/router";
import {RecipesService} from "../../services/recipes.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  standalone: true,
  imports: [
    DropdownDirective,
    RouterLink
  ],
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private ingredientsService: IngredientsService,
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.recipe = data['recipe'];
        })
  }

  addIngredients = () => this.ingredientsService.addIngredients(this.recipe.ingredients)

  delete = () => {
    this.recipeService.deleteRecipe(this.recipe.id)
    this.router.navigate(['recipes']);
  }
}
