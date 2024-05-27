import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "./header/header.componenet";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RouterOutlet} from "@angular/router";
import {AuthServices} from "./services/auth.services";

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
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private authServices: AuthServices) {
  }

  ngOnInit() {
    this.authServices.autoLogin()
  }
}
