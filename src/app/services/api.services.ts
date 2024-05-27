import {tap} from "rxjs";

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../shared/recipe.model";
import {RecipesService} from "./recipes.service";

@Injectable({providedIn: 'root'})
export class ApiServices {
  apiUrl = "https://user-app-theta.vercel.app/api"

  constructor(private http: HttpClient, private recipesService: RecipesService) {
  }

  saveData() {
    const recipes = this.recipesService.getRecipes()
    this.http.post<Recipe[]>(`${this.apiUrl}/recipes`, recipes)
      .subscribe(() => console.log("saved"))
  }

  fetchData() {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`)
      .pipe(
        tap(recipes => this.recipesService.saveRecipes(recipes)))
  }

}
