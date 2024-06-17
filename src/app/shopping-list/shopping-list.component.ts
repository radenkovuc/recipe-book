import {Component, inject} from '@angular/core';
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";

import {ShoppingEditComponent} from "./shopping-edit";
import {AppStore} from "../store";
import {Ingredient} from "../shared";
import {ShoppingItemComponent} from "./shopping-item";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  standalone: true,
  imports: [
    ShoppingEditComponent,
    ShoppingItemComponent,
    AsyncPipe
  ],
})
export class ShoppingListComponent {
  private store = inject(AppStore)
  ingredients: Observable<Ingredient[]>;

  constructor() {
    this.ingredients = this.store.select(state => state.shoppingList.list)
  }

}
