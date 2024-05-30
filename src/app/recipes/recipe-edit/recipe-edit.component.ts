import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import {Recipe} from "../../shared";
import {AppStore} from "../../store";
import {addRecipe, deleteRecipe, updateRecipe} from "../../store/recipe";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  recipeForm: FormGroup;
  isUpdate = false

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.store.select(s => s.recipes.selectedRecipe).subscribe(
      recipe => {
        this.isUpdate = !!recipe
        this.recipe = recipe;
        this.initForm()
      })
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.recipe) {
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      this.recipe.ingredients.forEach(ingredient => {
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(ingredient.name, [Validators.required]),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)]),
        }))
      })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      "ingredients": recipeIngredients
    });

  }

  get ingredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  update = () => {
    if (this.recipeForm.valid) {
      const {name, description, imagePath, ingredients} = this.recipeForm.value;
      if (this.isUpdate) {
        this.store.dispatch(updateRecipe({id: this.recipe.id, name, description, imagePath, ingredients}));
      } else {
        this.store.dispatch(addRecipe({name, description, imagePath, ingredients}));
      }
      this.router.navigate(['recipes', this.recipe.id]);
    }
  }

  delete = () => {
    this.store.dispatch(deleteRecipe({id: this.recipe.id}));
    this.router.navigate(['recipes']);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.min(1)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
