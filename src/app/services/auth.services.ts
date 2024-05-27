import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EncryptionService} from "./encryption.service";

@Injectable({providedIn: 'root'})
export class AuthServices {
  apiUrl = "https://user-app-theta.vercel.app/api"

  constructor(private http: HttpClient, private encryptionService: EncryptionService) {
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password: this.encryptionService.encrypt(password)
    })
  }

  register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      email,
      password: this.encryptionService.encrypt(password)
    })
  }
}
