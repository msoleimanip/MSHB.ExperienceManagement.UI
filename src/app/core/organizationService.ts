import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class OrganizationService {

  constructor(private http: HttpClient) {
  }

  getTree(): Observable<any> {
    return this.http.get('/api/Organization/Get');
  }

  getParentInfo(): Observable<any> {
    return this.http.get('');
  }

  getRootNames(): Observable<any> {
    return this.http.get('');
  }

}
