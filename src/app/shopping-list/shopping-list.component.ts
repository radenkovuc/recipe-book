import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {Ingredient} from "../shared/ingredient.model";
import {IngredientsService} from "../services/ingreadients.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  standalone: true,
  imports: [
    ShoppingEditComponent
  ],
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = []
  selectedIngredient: Ingredient = undefined
  subscriptionIngredients: Subscription;
  subscriptionIngredient: Subscription;

  constructor(private ingredientsService: IngredientsService) {
  }

  ngOnInit() {
    this.ingredients = this.ingredientsService.getIngredients()
    this.subscriptionIngredients = this.ingredientsService.ingredientsChanged.subscribe(ingredients => {
      this.ingredients = ingredients
    })
    this.subscriptionIngredient = this.ingredientsService.ingredientChanged.subscribe(ingredient => {
      this.selectedIngredient = ingredient
    })
  }

  ngOnDestroy() {
    this.subscriptionIngredients.unsubscribe()
    this.subscriptionIngredient.unsubscribe()
  }

  selectFromList(ingredient: Ingredient) {
    this.ingredientsService.selectIngredient(ingredient)
  }

}
