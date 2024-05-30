import {createReducer, on} from "@ngrx/store";

import {addIngredients, deleteIngredient, selectIngredient, updateIngredient} from "./shopping-list.actions";
import {initialState} from "./shopping-list.state";

export const shoppingListReducer = createReducer(initialState,
  on(updateIngredient, (state, action) => {
    let list = [...state.list];
    if (state.selected) {
      list = list.map(ing => ing.id === state.selected.id ? {
        ...ing,
        name: action.name,
        amount: action.amount,
      } : ing)
    } else {
      list.push({
        id: Date.now(),
        name: action.name,
        amount: action.amount,
      })
    }
    return {...state, list}
  }),
  on(addIngredients, (state, action) => {
    let list = [...state.list];
    action.ingredients.forEach(ingredient => {
      let isNew = true
      list = list.map(ing => {
        if (ing.id === ingredient.id) {
          isNew = false
          return {...ingredient, amount: ingredient.amount + ing.amount}
        } else {
          return ing
        }
      })
      if (isNew) {
        list.push(ingredient)
      }
    })

    return {...state, list}
  }),
  on(selectIngredient, (state, action) => ({
    ...state,
    selected: action.ingredient
  })),
  on(deleteIngredient, (state) => ({
    ...state,
    list: state.list.filter(ingredient => ingredient.id !== state.selected?.id)
  }))
);
