import {BehaviorSubject, Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {EncryptionService} from "./encryption.service";
import {User} from "../shared/user.model";

interface Response {
  message: string,
  user: User
}

@Injectable({providedIn: 'root'})
export class AuthServices {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  apiUrl = "https://user-app-theta.vercel.app/api"
  // apiUrl = "http://localhost:3000/api"

  constructor(private http: HttpClient, private encryptionService: EncryptionService) {
    this.userSubject = new BehaviorSubject<User | null>(null); // Initial value is null
    this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<Response>(`${this.apiUrl}/login`, {
      email,
      password: this.encryptionService.encrypt(password)
    }).pipe(
      tap(resp => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.userSubject.next(resp.user)
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
        this.userSubject.next(resp.user)
      })
    )
  }

  autoLogin() {
    const user: User = JSON.parse(localStorage.getItem('user'))
    this.userSubject.next(user)
  }

  logout() {
    this.userSubject.next(null)
    localStorage.removeItem('user')
  }
}
