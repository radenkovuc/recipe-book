import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Recipe} from "../shared";
import {AppStore} from "../store";

@Injectable({providedIn: 'root'})
export class ApiServices {
  apiUrl = "https://user-app-theta.vercel.app/api"

  constructor(private http: HttpClient, private store: AppStore) {
  }

  saveData() {
    this.store.select(s => s.recipes.recipes).subscribe(
      recipes => this.http.post<Recipe[]>(`${this.apiUrl}/recipes`, recipes)
        .subscribe(() => console.log("saved")))
  }

  fetchData() {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`)
  }

}
