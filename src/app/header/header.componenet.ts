import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Subscription} from "rxjs";

import {DropdownDirective} from "../shared";
import {ApiServices, AuthServices} from "../services";
import {AppStore} from "../store";
import {loadRecipes} from "../store/recipe";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    DropdownDirective,
    RouterLink,
    RouterLinkActive
  ],
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = false;
  isLoggedIn: boolean = false;
  subscription: Subscription;

  constructor(readonly apiServices: ApiServices, private store: AppStore, private authServices: AuthServices, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.store.select(s => s.user.user)
      .subscribe(user => {
        this.isLoggedIn = !!user
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchRecipes(): void {
    this.apiServices.fetchData()
      .subscribe(recipes => this.store.dispatch(loadRecipes({recipes})))
    this.router.navigate([""])
  }

  postRecipes(): void {
    this.apiServices.saveData()
  }

  logout(): void {
    this.authServices.logout()
  }
}
