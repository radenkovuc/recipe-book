import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../shared/recipe.model";
import {RecipesService} from "./recipes.service";
import {tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class ApiServices {
  constructor(private http: HttpClient, private recipesService: RecipesService) {
  }

  saveData() {
    const recipes = this.recipesService.getRecipes()
    this.http.put<Recipe[]>("https://ng-complete-guide-11ecd-default-rtdb.europe-west1.firebasedatabase.app/recipe.json", recipes)
      .subscribe(() => console.log("saved"))
  }

  fetchData() {
    return this.http.get<Recipe[]>("https://ng-complete-guide-11ecd-default-rtdb.europe-west1.firebasedatabase.app/recipe.json")
      .pipe(
        tap(recipes => this.recipesService.saveRecipes(recipes)))
  }

}
