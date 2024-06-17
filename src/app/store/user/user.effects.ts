import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of, switchMap, tap, withLatestFrom} from "rxjs";
import {Injectable} from "@angular/core";

import {load, setUser} from "./user.actions";
import {User} from "../../shared";
import {AppStore} from "../app.store";

@Injectable({providedIn: "root"})
export class UserEffect {
  loadUserFromLocalStorage = createEffect(() => this.actions.pipe(
    ofType(load),
    switchMap(() => {
      const user: User = JSON.parse(localStorage.getItem('user'))
      return of(setUser({user}));
    })
  ))

  saveUserToLocalStorage = createEffect(() => this.actions.pipe(
    ofType(setUser),
    withLatestFrom(this.store.select(s => s.user.user)),
    tap(([action, user]) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user')
      }
    })
  ), {dispatch: false})


  constructor(private actions: Actions, private store: AppStore) {
  }

}
