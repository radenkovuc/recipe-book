import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes.service";
import {NgForOf} from "@angular/common";

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

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        const recipe: Recipe = data['recipe'];
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
        this.recipeService.updateRecipe(this.recipe.id, name, description, imagePath, ingredients)
      } else {
        this.recipe = this.recipeService.addRecipe(name, description, imagePath, ingredients)
      }
      this.router.navigate(['recipes', this.recipe.id]);
    }
  }

  delete = () => {
    this.recipeService.deleteRecipe(this.recipe.id)
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
