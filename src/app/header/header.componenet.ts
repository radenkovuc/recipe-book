import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

import {DropdownDirective} from "../shared";
import {ApiServices, AuthServices} from "../services";
import {AppStore} from "../store";
import {loadRecipes} from "../store/recipe";
import {isLoggedIn} from '../store/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    DropdownDirective,
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
})

export class HeaderComponent implements OnInit {
  private apiServices = inject(ApiServices)
  private store = inject(AppStore)
  private authServices = inject(AuthServices)
  private router = inject(Router)
  collapsed: boolean = false
  isLoggedIn: Observable<boolean>

  ngOnInit() {
    this.isLoggedIn = this.store.select(isLoggedIn)
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
