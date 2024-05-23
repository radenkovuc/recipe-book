import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {inject} from '@angular/core';

import {RecipesService} from "../services/recipes.service";
import {Recipe} from "./recipe.model";

export const RecipeResolver: ResolveFn<Recipe> = (route: ActivatedRouteSnapshot) => {
  const recipesService = inject(RecipesService);

  return recipesService.getRecipe(route.params['id']);
}
