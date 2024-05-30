import {BehaviorSubject, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {EncryptionService} from "./encryption.service";
import {User} from "../shared";

interface Response {
  message: string,
  user: User
}

@Injectable({providedIn: 'root'})
export class AuthServices {
  user = new BehaviorSubject<User | null>(null);
  apiUrl = "https://user-app-theta.vercel.app/api"

  // apiUrl = "http://localhost:3000/api"

  constructor(private http: HttpClient, private encryptionService: EncryptionService) {
  }

  login(email: string, password: string) {
    return this.http.post<Response>(`${this.apiUrl}/login`, {
      email,
      password: this.encryptionService.encrypt(password)
    }).pipe(
      tap(resp => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user.next(resp.user)
      })
    )
  }

  register(email: string, password: string) {
    return this.http.post<Response>(`${this.apiUrl}/register`, {
      email,
      password: this.encryptionService.encrypt(password)
    }).pipe(
      tap(resp => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.user.next(resp.user)
      })
    )
  }

  autoLogin() {
    const user: User = JSON.parse(localStorage.getItem('user'))
    this.user.next(user)
  }

  logout() {
    this.user.next(null)
    localStorage.removeItem('user')
  }
}
