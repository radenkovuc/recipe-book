import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";

import {AuthServices} from "../services";
import {AlertComponent} from "../alert";
import {AppStore} from "../store";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    AlertComponent
  ],
})

export class AuthComponent implements OnInit {
  isLogin = false
  errorMessage: string = ""

  constructor(private route: ActivatedRoute, private router: Router, private authServices: AuthServices, private store: AppStore) {
  }

  ngOnInit() {
    this.route.url.subscribe(url => {
      if (url[0].path === 'login') {
        this.isLogin = true
      }
    })
  }

  onCloseError = () => this.errorMessage = ''

  loginOrRegister(form: NgForm): void {
    const {email, password} = form.value
    if (this.isLogin) {
      this.authServices.login(email, password).subscribe({
        next: res => {
          this.router.navigate([''])
        },
        error: error => {
          console.log(error)
          this.errorMessage = error.error.message;
        }
      });
    } else {
      this.authServices.register(email, password).subscribe({
        next: res => {
          this.router.navigate([''])
        },
        error: error => {
          console.log(error)
          this.errorMessage = error.error.message;
        }
      });
    }
  }
}
