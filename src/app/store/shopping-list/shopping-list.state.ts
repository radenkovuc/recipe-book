import {Ingredient} from "../../shared/ingredient.model";

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
