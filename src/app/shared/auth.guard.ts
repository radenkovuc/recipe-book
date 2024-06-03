import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {map, take} from "rxjs";
import {AppStore} from "../store";

export const canAccessToPages: CanActivateFn = () => {
  const store = inject(AppStore)
  const router = inject(Router)

  return store.select(s => s.user.user).pipe(
    take(1),
    map(user => {
      const isAuthenticated = !!user
      if (isAuthenticated) {
        return true
      }
      return router.createUrlTree(['login']);
    }))
};
