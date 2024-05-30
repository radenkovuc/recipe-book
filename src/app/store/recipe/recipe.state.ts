import {Recipe} from "../../shared/recipe.model";

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipe?: Recipe;
  loading: boolean;
}

export const initialState: RecipeState = {recipes: [], selectedRecipe: null, loading: true};
