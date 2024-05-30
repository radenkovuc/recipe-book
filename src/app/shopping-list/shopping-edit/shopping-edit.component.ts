import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {deleteIngredient, selectIngredient, updateIngredient} from "../../store/shopping-list";
import {AppStore} from "../../store";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit {
  shoppingForm: FormGroup;
  isUpdate = false

  constructor(private store: Store<AppStore>) {}

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      'name': new FormControl("", [Validators.required]),
      'amount': new FormControl("", [Validators.required, Validators.min(1)]),
    });

    this.store.select(s => s.shoppingList.selected).subscribe(selected => {
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
