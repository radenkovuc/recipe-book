import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';

import {Recipe} from "./recipe.model";
import {ApiServices} from "../services/api.services";
import {RecipesService} from "../services/recipes.service";

export const RecipesResolver: ResolveFn<Recipe[]> = () => {
  const apiServices = inject(ApiServices);
  const recipesService = inject(RecipesService);

  const recipes = recipesService.getRecipes();

  if (recipes.length == 0) {
    return apiServices.fetchData()
  } else {
    return recipes;
  }
}
