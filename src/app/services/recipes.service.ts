import {Injectable} from "@angular/core";
import {Recipe} from "../shared/recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {ApiServices} from "./api.services";

@Injectable({providedIn: 'root'})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = []

  getRecipes = () => this.recipes.slice()

  getRecipe = (id: string) => this.recipes.find(recipe => recipe.id === id)

  addRecipe = (name: string, description: string, imagePath: string, ingredients: Ingredient[]): Recipe => {
    const newRecipe = {
      id: Date.now().toString(), name, description, imagePath,
      ingredients: ingredients.map(ingredient => (
        {id: Date.now(), name: ingredient.name, amount: ingredient.amount}))
    }
    this.recipes.push(newRecipe)
    this.recipesChanged.next(this.recipes.slice())
    return newRecipe;
  }

  updateRecipe = (id: string, name: string, description: string, imagePath: string, ingredients: Ingredient[]) => {
    this.recipes = this.recipes.map(recipe => (recipe.id === id ? {
      id,
      name,
      description,
      imagePath,
      ingredients: ingredients.map(ingredient => (
        {id: Date.now(), name: ingredient.name, amount: ingredient.amount}))
    } : recipe))
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(id: string) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id)
    this.recipesChanged.next(this.recipes.slice())
  }

  saveRecipes = (recipes: Recipe[]) => {
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }
}
