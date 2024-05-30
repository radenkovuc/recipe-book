import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {map, take} from "rxjs";

import {AuthServices} from "../services";

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
