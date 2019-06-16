import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class GroupAuthenticationService {

  constructor(private http: HttpClient) {
  }

  getGroupAuthentication(): Observable<any> {
    return this.http.get('api/GroupAuthentication/getGroupAuthentication');
  }
}
