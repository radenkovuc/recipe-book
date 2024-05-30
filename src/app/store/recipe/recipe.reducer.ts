import {createReducer, on} from "@ngrx/store";

import {addRecipe, deleteRecipe, loadRecipes, selectRecipe, updateRecipe} from "./recipe.actions";
import {initialState} from "./recipe.state";

export const recipeReducer = createReducer(initialState,
  on(selectRecipe, (state, action) => ({
    ...state,
    selectedRecipe: action.recipe,
  })),
  on(addRecipe, (state, action) => {
    const newRecipe = {
      name: action.name,
      description: action.description,
      imagePath: action.imagePath,
      ingredients: action.ingredients.map(ingredient => (
        {id: Date.now(), name: ingredient.name, amount: ingredient.amount}))
    }
    return {
      ...state,
      recipes: [...state.recipes, newRecipe],
      selectedRecipe: newRecipe
    }
  }),
  on(updateRecipe, (state, action) => {
    const recipes = state.recipes.map(recipe => (recipe.id === action.id ? {
      id: action.id,
      name: action.name,
      description: action.description,
      imagePath: action.imagePath,
      ingredients: action.ingredients.map(ingredient => (
        {id: Date.now(), name: ingredient.name, amount: ingredient.amount}))
    } : recipe))
    return {...state, recipes}
  }),
  on(loadRecipes, (state, action) => ({
    ...state,
    loading: false,
    recipes: action.recipes
  })),
  on(deleteRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.filter(recipe => recipe.id !== action.id)
  }))
);
