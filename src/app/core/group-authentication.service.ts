import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddGroupFormModel } from '../dataModels/apiModels/addGroupFormModel';
import { EditGroupFormModel } from '../dataModels/apiModels/editGroupFormModel';


@Injectable()
export class GroupAuthenticationService {

  constructor(private http: HttpClient) {
  }

  getGroupAuthentication(): Observable<any> {
    return this.http.get('/api/GroupAuthentication/GetGroupAuthentication');
  }

  getGroupAuthenticationById(id: number): Observable<any> {
    return this.http.get('/api/GroupAuthentication/getGroupAuthenticationById?id=' + id);
  }

  getGroupRole(id: number): Observable<any> {
    return this.http.get('/api/GroupAuthentication/getGroupRole?Id=' + id);
  }

  getRoles(): Observable<any> {
    return this.http.get('/api/GroupAuthentication/getRoles');
  }

  addGroup(addGroupModel: AddGroupFormModel): Observable<any> {
    return this.http.post('/api/GroupAuthentication/addGroup', addGroupModel);
  }

  editGroup(editGroupModel: EditGroupFormModel): Observable<any> {
    return this.http.post('/api/GroupAuthentication/editGroup', editGroupModel);
  }

}
