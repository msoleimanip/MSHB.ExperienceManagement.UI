import { PresidentType } from './../dataModels/enums/presidentType';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      if (route.data.roles) {
        if (currentUser.isPresident === PresidentType.Admin) {
          return true;
        }

        let flag = false;
        let i = 0;
        for (i = 0; i < route.data.roles.length; i++) {
          flag = currentUser.role && currentUser.role.includes(route.data.roles[i]);
          if (flag) {
            break;
          }
        }

        if (!flag) {
          // role not authorised so redirect to home page
          this.toastr.warning('شما به صفحه مورد نظر دسترسی ندارید.', 'هشدار امنیتی');
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['home'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
