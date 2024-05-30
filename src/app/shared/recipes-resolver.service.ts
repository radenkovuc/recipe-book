import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {ApiServices} from "../services/api.services";
import {AppStore} from "../store";
import {Store} from "@ngrx/store";
import {loadRecipes} from "../store/recipe";

export const RecipesResolver: ResolveFn<void> = () => {
  const apiServices = inject(ApiServices);
  const store = inject(Store<AppStore>);

  store.select(s => s.recipes.recipes).subscribe(recipes => {
    if (recipes.length == 0) {
      apiServices.fetchData().subscribe(recipes => store.dispatch(loadRecipes({recipes})));
    }
  })
}
