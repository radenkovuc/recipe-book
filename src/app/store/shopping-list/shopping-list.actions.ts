import {createAction, props} from "@ngrx/store";

import {Ingredient} from "../../shared/ingredient.model";

export const updateIngredient = createAction("shopping-list/update-single", props<{ name: string, amount: number }>());
export const addIngredients = createAction("shopping-list/add", props<{ ingredients: Ingredient[] }>());
export const selectIngredient = createAction("shopping-list/select", props<{ ingredient?: Ingredient }>());
export const deleteIngredient = createAction("shopping-list/delete");
