import {tap} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {EncryptionService} from "./encryption.service";
import {User} from "../shared";
import {AppStore} from "../store";
import {setUser} from "../store/user";

export interface Response {
  message: string,
  user: User
}

@Injectable({providedIn: 'root'})
export class AuthServices {
  private http = inject(HttpClient)
  private encryptionService = inject(EncryptionService)
  private store = inject(AppStore)
  apiUrl = "https://user-app-theta.vercel.app/api"

  // apiUrl = "http://localhost:3000/api"

  login(email: string, password: string) {
    return this.http.post<Response>(`${this.apiUrl}/login`, {
      email,
      password: this.encryptionService.encrypt(password)
    }).pipe(
      tap(resp => {
        console.log(resp)
        this.store.dispatch(setUser(resp))
      })
    )
  }

  register(email: string, password: string) {
    return this.http.post<Response>(`${this.apiUrl}/register`, {
      email,
      password: this.encryptionService.encrypt(password)
    }).pipe(
      tap(resp => {
        console.log(resp)
        this.store.dispatch(setUser(resp))
      })
    )
  }

  logout() {
    this.store.dispatch(setUser({user: null}))
  }
}
