import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthServices} from "../services/auth.services";
import {map, tap} from "rxjs";


export const canAccessToPages: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authServices = inject(AuthServices)
  const router = inject(Router)

  return authServices.user.pipe(map(user => !!user)).pipe(tap(isAuthenticated => {
    if (!isAuthenticated) {
      router.navigate(['login']);
    }
  }))
};
