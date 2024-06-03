import {tap} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {EncryptionService} from "./encryption.service";
import {User} from "../shared";
import {AppStore} from "../store";
import {setUser} from "../store/user";

interface Response {
  message: string,
  user: User
}

@Injectable({providedIn: 'root'})
export class AuthServices {
  apiUrl = "https://user-app-theta.vercel.app/api"

  // apiUrl = "http://localhost:3000/api"

  constructor(private http: HttpClient, private encryptionService: EncryptionService, private store: AppStore) {
  }

  login(email: string, password: string) {
    return this.http.post<Response>(`${this.apiUrl}/login`, {
      email,
      password: this.encryptionService.encrypt(password)
    }).pipe(
      tap(resp => {
        this.store.dispatch(setUser(resp))
        localStorage.setItem('user', JSON.stringify(resp.user));
      })
    )
  }

  register(email: string, password: string) {
    return this.http.post<Response>(`${this.apiUrl}/register`, {
      email,
      password: this.encryptionService.encrypt(password)
    }).pipe(
      tap(resp => {
        this.store.dispatch(setUser(resp))
        localStorage.setItem('user', JSON.stringify(resp.user));
      })
    )
  }

  autoLogin() {
    const user: User = JSON.parse(localStorage.getItem('user'))
    this.store.dispatch(setUser({user}))
  }

  logout() {
    this.store.dispatch(setUser({user: null}))
    localStorage.removeItem('user')
  }
}
