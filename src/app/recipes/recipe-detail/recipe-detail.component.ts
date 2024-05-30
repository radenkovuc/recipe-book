import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {DropdownDirective} from "../../shared/dropdown.directive";
import {Router, RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {addIngredients} from "../../store/shopping-list";
import {AppStore} from "../../store";
import {deleteRecipe} from "../../store/recipe";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  standalone: true,
  imports: [
    DropdownDirective,
    RouterLink,
    AsyncPipe
  ],
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  loading: Observable<boolean>;

  constructor(private store: Store<AppStore>, private router: Router) {
    this.loading = this.store.select(s => s.recipes.loading)
  }

  ngOnInit() {
    this.store.select(s => s.recipes.selectedRecipe).subscribe(recipe => this.recipe = recipe)
  }

  addIngredients = () =>
    this.store.dispatch(addIngredients({ingredients: this.recipe.ingredients}))

  delete = () => {
    this.store.dispatch(deleteRecipe({id: this.recipe.id}));
    this.router.navigate(['recipes']);
  }
}
