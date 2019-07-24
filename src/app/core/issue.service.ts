import { AddIssueDetailCommentFormModel } from './../dataModels/apiModels/addIssueDetailCommentFormModel';
import { AddIssueFormModel } from './../dataModels/apiModels/addIssueFormModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchIssueFormModel } from '../dataModels/apiModels/searchIssueFormModel';
import { AddIssueDetailFormModel } from '../dataModels/apiModels/addIssueDetailFormModel';
import { ActivateIssueFormModel } from '../dataModels/apiModels/activateIssueFormModel';
import { SearchSmartIssueFormModel } from '../dataModels/apiModels/searchSmartIssueFormModel';
import { SearchIssueDetailFormModel } from '../dataModels/apiModels/searchIssueDetailFormModel';

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

  activateIssue(activateIssueModel: ActivateIssueFormModel): Observable<any> {
    return this.http.post('api/Issue/activateIssue', activateIssueModel);
  }

  searchSmartIssue(searchSmartIssueModel: SearchSmartIssueFormModel): Observable<any> {
    return this.http.post('api/Issue/searchSmartIssue', searchSmartIssueModel);
  }

  getIssueDetails(searchIssueDetailModel: SearchIssueDetailFormModel): Observable<any> {
    return this.http.post('api/Issue/GetIssueDetails', searchIssueDetailModel);
  }

  addIssueDetailComment(addIssueDetailCommentModel: AddIssueDetailCommentFormModel): Observable<any> {
    return this.http.post('api/Issue/AddIssueDetailComment', addIssueDetailCommentModel);
  }

  getUserIssueDashboard(): Observable<any> {
    return this.http.get('api/Dashboard/GetUserIssueDashboard');
  }
  getUserLikesDashboard(): Observable<any> {
    return this.http.get('api/Dashboard/GetUserLikesDashboard');
  }
  
}
