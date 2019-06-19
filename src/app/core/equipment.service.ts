import { EditEquipmentFormModel } from '../dataModels/apiModels/editEquipmentFormModel';
import { AddEquipmentFormModel } from '../dataModels/apiModels/addEquipmentFormModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class EquipmentService {

  constructor(private http: HttpClient) {
  }

  getTree(): Observable<any> {
    return this.http.get('/api/Equipment/GetEquipmentByUser');
  }

  getEquipmentForUser(userId: string): Observable<any> {
    return this.http.get('/api/Equipment/getUserEquipmentForUser?userId=' + userId);
  }

  getEquipment(id: number): Observable<any> {
    return this.http.get('/api/Equipment/Get?id=' + id);
  }

  add(equipment: AddEquipmentFormModel): Observable<any> {
    return this.http.post('/api/Equipment/AddEquipment', equipment);
  }

  edit(equipment: EditEquipmentFormModel): Observable<any> {
    return this.http.post('/api/Equipment/EditEquipment', equipment);
  }
}
