import { EditOrgFormModel } from './../dataModels/apiModels/editOrgFormModel';
import { AddOrgFormModel } from './../dataModels/apiModels/addOrgFormModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class OrganizationService {

  constructor(private http: HttpClient) {
  }

  getTree(): Observable<any> {
    return this.http.get('/api/Organization/GetOrganizationByUser');
  }

  getUserOrgazinationForUser(userId: string): Observable<any> {
    return this.http.get('/api/Organization/getUserOrgazinationForUser?userId=' + userId);
  }

  getOrganization(id: number): Observable<any> {
    return this.http.get('/api/Organization/Get?id=' + id);
  }

  add(org: AddOrgFormModel): Observable<any> {
    return this.http.post('/api/Organization/AddOrganization', org);
  }

  edit(org: EditOrgFormModel): Observable<any> {
    return this.http.post('/api/Organization/EditOrganization', org);
  }
}
