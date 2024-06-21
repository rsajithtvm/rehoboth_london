import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class AdminService {

    constructor(public http: HttpClient) { }
    baseURL: string = environment.apiUrl;
    
    getAdmins(): Observable<any> {
        const headers = {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        return this.http.get<any>(this.baseURL + "admin/get", { headers: headers });
      }
    
      saveAdminData(data) {
        const headers = { "content-type": "application/json" };
        const body = JSON.stringify(data);
        return this.http.post(this.baseURL + "admin/save", body, { headers: headers });
      }
    
      updateAdminData(data) {
        const headers = { "content-type": "application/json" };
        const body = JSON.stringify(data);
        return this.http.put(this.baseURL + "admin/update", body, { headers: headers });
      }
    
      deleteAdminData(data) {
        const headers = { "content-type": "application/json" };
        const params = { id: data.adminid };
    
        return this.http.delete(this.baseURL + "admin/delete", {
          headers: headers,
          params: params,
        });
      }
}