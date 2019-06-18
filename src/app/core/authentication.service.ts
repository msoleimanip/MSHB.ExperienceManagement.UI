import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { User } from '../dataModels/viewModels/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('api/account/login', { username, password })
      .pipe(map(res => {
        // login successful if there's a jwt token in the response
        if (res.data && res.data.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const decoded = jwt_decode(res.data.access_token);
          const user = new User();
          user.role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          user.displayName = decoded.DisplayName;
          user.name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          user.family = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
          user.id = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'];
          user.isAdmin = decoded.IsPresident === '1';
          user.fullName = user.name + ' ' + user.family;
          user.token = res.data.access_token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return res.data;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
