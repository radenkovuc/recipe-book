import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from "@ngrx/store";

import {AppStore} from "../store";
import {selectRecipe} from "../store/recipe";

export const RecipeResolver: ResolveFn<void> = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store<AppStore>);

  store.select(s => s.recipes.recipes).subscribe(recipes => {
    const recipe = recipes.find(r => r.id === route.params['id']);
    store.dispatch(selectRecipe({recipe}))
  })

}
