import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {RecipesComponent} from "./recipes";
import {ShoppingListComponent} from "./shopping-list";
import {RecipeDetailComponent} from "./recipes/recipe-detail";
import {RecipeEditComponent} from "./recipes/recipe-edit";
import {RecipeStartComponent} from "./recipes/recipe-start";
import {AuthComponent} from "./auth";
import {RecipeResolver,canAccessToPages,RecipesResolver} from "./shared";

const appRoutes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipesComponent, resolve: [RecipesResolver], canActivate: [canAccessToPages],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent, resolve: [RecipeResolver]},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolver]},
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'login', component: AuthComponent},
  {path: 'signup', component: AuthComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
