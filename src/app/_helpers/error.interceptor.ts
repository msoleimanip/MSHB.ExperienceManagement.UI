import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../core/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        this.toastr.error(err.statusText, err.status.toString());
        this.authenticationService.logout();
        this.router.navigate(['/']);
        // location.reload(true);
      } else if ([403].indexOf(err.status) !== -1) {
        this.toastr.error(err.statusText, err.status.toString());
        this.router.navigate(['accessDenied']);
      } else if ([501].indexOf(err.status) !== -1) {
        this.toastr.error(err.error.errorMessage, err.error.errorCode);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}