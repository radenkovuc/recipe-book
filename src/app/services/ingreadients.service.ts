import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class IngredientsService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient | undefined>();
  selectedIngredient: Ingredient = null

  private ingredients: Ingredient[] = [
    new Ingredient(1, "test", 2),
    new Ingredient(2, "nesto", 5)
  ]

  getIngredients = () => this.ingredients.slice();

  updateIngredient = (name: string, amount: number) => {
    if (this.selectedIngredient) {
      console.log("update")
      this.ingredients = this.ingredients.map(ing => ing.id === this.selectedIngredient.id ? {
        ...ing,
        name,
        amount
      } : ing)
    } else {
      this.ingredients.push({id: Date.now(), name, amount})
    }
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients = (ingredients: Ingredient[]) => {
    ingredients.forEach(ingredient => {
      let isNew = true
      this.ingredients = this.ingredients.map(ing => {
        if (ing.id === ingredient.id) {
          isNew = false
          return {...ingredient, amount: ingredient.amount + ing.amount}
        } else {
          return ing
        }
      })
      if (isNew) {
        this.ingredients.push(ingredient)
      }
    })
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  selectIngredient(ingredient: Ingredient | null) {
    this.selectedIngredient = ingredient
    this.ingredientChanged.next(ingredient)
  }

  deleteIngredient() {
    this.ingredients = this.ingredients.filter(ingredient => ingredient.id !== this.selectedIngredient.id)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
