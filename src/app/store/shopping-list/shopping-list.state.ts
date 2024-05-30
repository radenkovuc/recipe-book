import {Ingredient} from "../../shared";

export interface ShoppingListState {
  list: Ingredient[]
  selected?: Ingredient
}

export const initialState: ShoppingListState = {
  list: [
    new Ingredient(1, "test", 2),
    new Ingredient(2, "nesto", 5)
  ]
}
