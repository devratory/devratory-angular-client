import { AuthQuery } from '@ekhmoi/angular-sdk';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DefaultRedirectGuard implements CanActivate {
  constructor(private router: Router, private authQuery: AuthQuery) {}

  canActivate(snapShot: ActivatedRouteSnapshot) {
    if (this.authQuery.getValue().isLoggedIn) {
      this.router.navigate(['/app', 'tabs']);
      return false;
    }

    return true;
  }
}
