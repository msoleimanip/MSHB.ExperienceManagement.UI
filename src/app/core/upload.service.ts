import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()

export class FileService {

  constructor(private http: HttpClient) {
  }

  download(fileId: string): Observable<any> {
    return this.http.get('/api/File/download?fileId=' + fileId);
  }
}
