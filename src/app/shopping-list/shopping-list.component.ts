import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AsyncPipe, NgIf} from "@angular/common";
import {AppStore} from "../store";

import {ShoppingEditComponent} from "./shopping-edit";
import {selectIngredient} from "../store/shopping-list";
import {Ingredient} from "../shared";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  standalone: true,
  imports: [
    ShoppingEditComponent,
    AsyncPipe,
    NgIf
  ],
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
