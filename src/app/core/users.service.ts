import { AddUserFormModel } from './../dataModels/apiModels/addUserFormModel';
import { EditUserFormModel } from './../dataModels/apiModels/editUserFormModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchUserFormModel } from '../dataModels/apiModels/searchUserFormModel';
import { UserOrgAssignFormModel } from '../dataModels/apiModels/userOrgAssignFormModel';
import { UserEquipmentAssignFormModel } from '../dataModels/apiModels/userEquipmentAssignFormModel';

@Injectable()

export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(searchUserForm: SearchUserFormModel): Observable<any> {
    return this.http.post('/api/Account/GetUsers', searchUserForm);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get('/api/Account/getUserById?Id=' + userId);
  }

  editUser(editUserModel: EditUserFormModel): Observable<any> {
    return this.http.post('/api/Account/editUser', editUserModel);
  }

  addUser(addUserModel: AddUserFormModel): Observable<any> {
    return this.http.post('/api/Account/addUser', addUserModel);
  }

  userOrganizationAssign(userOrgAssignModel: UserOrgAssignFormModel): Observable<any> {
    return this.http.post('/api/Account/userOrganizationAssign', userOrgAssignModel);
  }

  userEquipmentAssign(userEquipmentAssignModel: UserEquipmentAssignFormModel): Observable<any> {
    return this.http.post('/api/Account/userEquipmentAssign', userEquipmentAssignModel);
  }
}
