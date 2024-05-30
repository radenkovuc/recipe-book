import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeResolver} from "./shared/recipe-resolver.service";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipesResolver} from "./shared/recipes-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {canAccessToPages} from "./shared/auth.guard";

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
