import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class MemberService {

    constructor(public http: HttpClient) { }
    baseURL: string = environment.apiUrl;
    
    getMembers(): Observable<any> {
        const headers = {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };
        return this.http.get<any>(this.baseURL + "member/get", { headers: headers });
      }
    
      saveMemberData(data) {
        const headers = { "content-type": "application/json" };
        const body = JSON.stringify(data);
        return this.http.post(this.baseURL + "member/save", body, { headers: headers });
      }
    
      updateMemberData(data) {
        const headers = { "content-type": "application/json" };
        const body = JSON.stringify(data);
        return this.http.put(this.baseURL + "member/update", body, { headers: headers });
      }
    
      deleteMemberData(data) {
        const headers = { "content-type": "application/json" };
        const params = { id: data.memberid };
    
        return this.http.delete(this.baseURL + "member/delete", {
          headers: headers,
          params: params,
        });
      }
}