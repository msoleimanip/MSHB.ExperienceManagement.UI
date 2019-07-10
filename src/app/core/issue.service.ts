import { AddIssueFormModel } from './../dataModels/apiModels/addIssueFormModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchIssueFormModel } from '../dataModels/apiModels/searchIssueFormModel';
import { AddIssueDetailFormModel } from '../dataModels/apiModels/addIssueDetailFormModel';

@Injectable()

export class IssueService {

  constructor(private http: HttpClient) {
  }

  getIssuesForUser(searchIssueModel: SearchIssueFormModel): Observable<any> {
    return this.http.post('api/Issue/getIssuesForUser', searchIssueModel);
  }

  addIssue(addIssueModel: AddIssueFormModel): Observable<any> {
    return this.http.post('api/Issue/addIssue', addIssueModel);
  }

  addIssueDetails(addIssueDetailModel: AddIssueDetailFormModel): Observable<any> {
    return this.http.post('api/Issue/addIssueDetails', addIssueDetailModel);
  }
}
