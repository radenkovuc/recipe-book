import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";

import {shoppingListReducer, ShoppingListState} from "./shopping-list";
import {recipeReducer, RecipeState} from "./recipe";

interface AppState {
  shoppingList: ShoppingListState
  recipes: RecipeState
}

@Injectable({providedIn: 'root'})
export class AppStore extends Store<AppState> {
}

export const appStore = {
  recipes: recipeReducer,
  shoppingList: shoppingListReducer,
}
