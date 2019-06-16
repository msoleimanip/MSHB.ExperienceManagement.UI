import { AddUserFormModel } from './../dataModels/apiModels/addUserFormModel';
import { EditUserFormModel } from './../dataModels/apiModels/editUserFormModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    return this.http.get('/api/Account/GetUsers');
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
}
