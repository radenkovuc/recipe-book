import {Recipe} from "../../shared";

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipe?: Recipe;
  loading: boolean;
}

export const initialState: RecipeState = {recipes: [], selectedRecipe: null, loading: true};
