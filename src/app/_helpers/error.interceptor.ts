import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../core/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401].indexOf(err.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        this.toastr.warning(this.translate.instant('General.Unauthorized'));
        this.authenticationService.logout();
        this.router.navigate(['home']);
        // location.reload(true);
      } else if ([403].indexOf(err.status) !== -1) {
        this.toastr.error(err.statusText, err.status.toString());
        this.router.navigate(['shared/accessDenied']);
      } else if ([501].indexOf(err.status) !== -1 || [400].indexOf(err.status) !== -1) {
        let message = '';
        if (err && err.error && err.error.detailErrorList) {
          err.error.detailErrorList.forEach(element => {
            message += element.message + '\r\n';
          });
        }
        if (message !== '') {
          this.toastr.error(message, err.error.errorCode);
        } else {
          this.toastr.error(err.error.errorMessage, err.error.errorCode);
        }
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
