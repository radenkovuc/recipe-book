import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthServices} from "../services/auth.services";
import {map, take} from "rxjs";


export const canAccessToPages: CanActivateFn = () => {
  const authServices = inject(AuthServices)
  const router = inject(Router)

  return authServices.user.pipe(
    take(1),
    map(user => {
      const isAuthenticated = !!user
      if (isAuthenticated) {
        return true
      }
      return router.createUrlTree(['login']);
    }))
};
