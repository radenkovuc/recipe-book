import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownDirective} from "../shared/dropdown.directive";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiServices} from "../services/api.services";
import {RecipesService} from "../services/recipes.service";
import {AuthServices} from "../services/auth.services";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    DropdownDirective,
    RouterLink,
    RouterLinkActive
  ],
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isLoggedIn: boolean = false;
  subscription: Subscription;

  constructor(readonly apiServices: ApiServices, private recipesService: RecipesService, private authServices: AuthServices, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.authServices.user.subscribe(user => {
      this.isLoggedIn = !!user
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchRecipes(): void {
    this.apiServices.fetchData().subscribe(recipes => this.recipesService.saveRecipes(recipes))
    this.router.navigate([""])
  }

  postRecipes(): void {
    this.apiServices.saveData()
  }

  logout(): void {
    this.authServices.logout()
  }
}
