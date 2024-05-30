import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";

import {HeaderComponent} from "./header";
import {RecipesComponent} from "./recipes";
import {ShoppingListComponent} from "./shopping-list";
import {AuthServices} from "./services";

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
  constructor(private authServices: AuthServices) {
  }

  ngOnInit() {
    this.authServices.autoLogin()
  }
}
