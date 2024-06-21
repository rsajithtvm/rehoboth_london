import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  upload(file: File, filename): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file, filename);
    formData.append('filename', filename);
    const req = new HttpRequest('POST', `${this.baseURL}file/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseURL}file/files`);
  }
}