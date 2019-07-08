import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportStructureFormModel } from '../dataModels/apiModels/reportStructureFormModel';


@Injectable()

export class ReportService {

  constructor(private http: HttpClient) {
  }

  getDashboardReport(): Observable<any> {
    return this.http.get('api/report/getDashboardReport');
  }

  getReportStructure(reportStructureModel: ReportStructureFormModel): Observable<any> {
    return this.http.post('api/report/getReportStructure', reportStructureModel);
  }

}
