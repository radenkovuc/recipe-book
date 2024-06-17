import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {Observable} from "rxjs";

import {AuthServices} from "../services";
import {AlertComponent} from "../alert";
import {Response} from "../services/auth.services";

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
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private authServices = inject(AuthServices)
  isLogin = false
  errorMessage: string = ""

  constructor() {
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
    let responseObservable: Observable<Response>;

    if (this.isLogin) {
      responseObservable = this.authServices.login(email, password)
    } else {
      responseObservable = this.authServices.register(email, password);
    }

    responseObservable.subscribe({
      next: () => {
        void this.router.navigate([''])
      },
      error: error => {
        console.log(error)
        this.errorMessage = error.error.message;
      }
    })
  }
}
