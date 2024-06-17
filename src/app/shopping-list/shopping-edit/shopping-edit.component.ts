import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

import {deleteIngredient, selectIngredient, updateIngredient} from "../../store/shopping-list";
import {AppStore} from "../../store";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class ShoppingEditComponent {
  private store = inject(AppStore)
  shoppingForm: FormGroup;
  isUpdate = false

  constructor() {
    this.shoppingForm = new FormGroup({
      'name': new FormControl("", [Validators.required]),
      'amount': new FormControl("", [Validators.required, Validators.min(1)]),
    });

    this.store.select(s => s.shoppingList.selected).pipe(takeUntilDestroyed()).subscribe(selected => {
      this.isUpdate = !!selected;
      if (selected) {
        this.shoppingForm.controls.name.setValue(selected.name);
        this.shoppingForm.controls.amount.setValue(selected.amount);
      }
    })
  }

  update = () => {
    if (this.shoppingForm.valid) {
      this.store.dispatch(updateIngredient({
        name: this.shoppingForm.value.name,
        amount: this.shoppingForm.value.amount
      }))
      this.clear()
    }
  }

  delete = () => {
    this.store.dispatch(deleteIngredient())
    this.clear()
  }

  clear = () => {
    this.store.dispatch(selectIngredient({}))
    this.shoppingForm.reset()
  }
}
