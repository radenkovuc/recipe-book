import {shoppingListReducer, ShoppingListState} from "./shopping-list";
import {recipeReducer, RecipeState} from "./recipe";

export interface AppStore {
  shoppingList: ShoppingListState
  recipes: RecipeState
}

export const store = {
  recipes: recipeReducer,
  shoppingList: shoppingListReducer,
}
