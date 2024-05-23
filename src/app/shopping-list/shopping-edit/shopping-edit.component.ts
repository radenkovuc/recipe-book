import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import {IngredientsService} from "../../services/ingreadients.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingForm: FormGroup;
  subscription: Subscription;
  isUpdate = false

  constructor(private ingredientsService: IngredientsService) {
  }

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      'name': new FormControl("", [Validators.required]),
      'amount': new FormControl("", [Validators.required, Validators.min(1)]),
    });
    this.subscription = this.ingredientsService.ingredientChanged.subscribe(ingredient => {
      this.isUpdate = !!ingredient;
      if (ingredient) {
        this.shoppingForm.controls.name.setValue(ingredient.name);
        this.shoppingForm.controls.amount.setValue(ingredient.amount);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  update = () => {
    if (this.shoppingForm.valid) {
      this.ingredientsService.updateIngredient(this.shoppingForm.value.name, this.shoppingForm.value.amount)
      this.clear()
    }
  }

  delete = () => {
    this.ingredientsService.deleteIngredient()
    this.clear()
  }

  clear = () => {
    this.ingredientsService.selectIngredient(null)
    this.shoppingForm.reset()
  }
}
