import {Component, OnDestroy, OnInit} from '@angular/core';
import {DropdownDirective} from "../shared/dropdown.directive";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ApiServices} from "../services/api.services";
import {AuthServices} from "../services/auth.services";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
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
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isLoggedIn: boolean = false;
  subscription: Subscription;

  constructor(readonly apiServices: ApiServices, private store: Store<AppStore>, private authServices: AuthServices, private router: Router) {
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
    this.apiServices.fetchData().subscribe(recipes => this.store.dispatch(loadRecipes({recipes})))
    this.router.navigate([""])
  }

  postRecipes(): void {
    this.apiServices.saveData()
  }

  logout(): void {
    this.authServices.logout()
  }
}
