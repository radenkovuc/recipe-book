import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";

import {HeaderComponent} from "./header";
import {RecipesComponent} from "./recipes";
import {ShoppingListComponent} from "./shopping-list";
import {AppStore} from "./store";
import {load} from "./store/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    RouterOutlet
  ],
})
export class AppComponent implements OnInit {
  constructor(private store: AppStore) {
  }

  ngOnInit() {
    this.store.dispatch(load())
  }
}
