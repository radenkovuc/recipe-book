import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AsyncPipe, NgIf} from "@angular/common";
import {AppStore} from "../store";

import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {Ingredient} from "../shared/ingredient.model";
import {selectIngredient} from "../store/shopping-list";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  standalone: true,
  imports: [
    ShoppingEditComponent,
    AsyncPipe,
    NgIf
  ],
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients: Observable<Ingredient[]>;
  selectedIngredient: Observable<Ingredient>;

  constructor(private store: Store<AppStore>) {
    this.ingredients = this.store.select(state => state.shoppingList.list)
    this.selectedIngredient = this.store.select(state => state.shoppingList.selected)
  }

  selectFromList(ingredient: Ingredient) {
    this.store.dispatch(selectIngredient({ingredient}))
  }

}
