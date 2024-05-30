import {createAction, props} from "@ngrx/store";

import {Ingredient,Recipe} from "../../shared";

export const selectRecipe = createAction("recipes/select", props<{ recipe: Recipe }>());
export const addRecipe = createAction("recipes/add", props<{
  name: string,
  description: string,
  imagePath: string,
  ingredients: Ingredient[]
}>());
export const updateRecipe = createAction("recipes/update", props<{
  id: string,
  name: string,
  description: string,
  imagePath: string,
  ingredients: Ingredient[]
}>());
export const deleteRecipe = createAction("recipes/delete", props<{ id: string }>());
export const loadRecipes = createAction("recipes/insert", props<{ recipes: Recipe[] }>());
