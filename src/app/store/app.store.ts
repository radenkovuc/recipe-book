import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";

import {shoppingListReducer, ShoppingListState} from "./shopping-list";
import {recipeReducer, RecipeState} from "./recipe";
import {userReducer, UserState} from "./user";

export interface AppState {
  shoppingList: ShoppingListState
  recipes: RecipeState
  user: UserState
}

@Injectable({providedIn: 'root'})
export class AppStore extends Store<AppState> {
}

export const appStore = {
  recipes: recipeReducer,
  shoppingList: shoppingListReducer,
  user: userReducer,
}
