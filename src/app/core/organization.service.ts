import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationDto } from '../dataModels/organizationDto';

@Injectable()

export class OrganizationService {

  constructor(private http: HttpClient) {
  }

  getTree(): Observable<any> {
    return this.http.get('/api/Organization/GetOrganizationByUser');
  }

  getOrganization(id: number): Observable<any> {
    return this.http.get('/api/Organization/Get?id=' + id);
  }

  add(org: OrganizationDto): Observable<any> {
    return this.http.post('/api/Organization/AddOrganization', org);
  }

  edit(org: OrganizationDto): Observable<any> {
    return this.http.post('/api/Organization/EditOrganization', org);
  }
}
