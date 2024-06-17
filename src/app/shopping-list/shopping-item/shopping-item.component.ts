import {Component, inject, input, OnInit, signal} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

import {selectIngredient} from "../../store/shopping-list";
import {AppStore} from "../../store";
import {Ingredient} from "../../shared";

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  standalone: true,
  imports: [],
})
export class ShoppingItemComponent implements OnInit {
  private store = inject(AppStore)
  ingredient = input.required<Ingredient>();
  isSelected = signal<boolean>(false)

  constructor() {
  }

  ngOnInit(): void {
    this.store.select(state => state.shoppingList.selected).pipe(takeUntilDestroyed()).subscribe(
      selectedIngredient => this.isSelected.set(selectedIngredient.id === this.ingredient().id))
  }

  selectFromList() {
    this.store.dispatch(selectIngredient({ingredient: this.ingredient()}))
  }
}
