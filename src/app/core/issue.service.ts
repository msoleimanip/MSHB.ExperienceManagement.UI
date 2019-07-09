import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchIssueFormModel } from '../dataModels/apiModels/searchIssueFormModel';

@Injectable()

export class IssueService {

  constructor(private http: HttpClient) {
  }

  getIssuesForUser(searchIssueModel: SearchIssueFormModel): Observable<any> {
    return this.http.post('api/Issue/getIssuesForUser', searchIssueModel);
  }
}
