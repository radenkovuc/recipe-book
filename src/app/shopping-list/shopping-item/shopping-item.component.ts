import {Component, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {Subscription} from "rxjs";

import {selectIngredient} from "../../store/shopping-list";
import {AppStore} from "../../store";
import {Ingredient} from "../../shared";

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  standalone: true,
  imports: [],
})
export class ShoppingItemComponent implements OnInit, OnDestroy {
  private store = inject(AppStore)
  ingredient = input.required<Ingredient>();
  isSelected = signal<boolean>(false)
  subscription: Subscription

  constructor() {
  }

  ngOnInit(): void {
    this.subscription = this.store.select(state => state.shoppingList.selected).subscribe(
      selectedIngredient => this.isSelected.set(selectedIngredient?.id === this.ingredient().id))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectFromList() {
    this.store.dispatch(selectIngredient({ingredient: this.ingredient()}))
  }
}
