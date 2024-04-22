import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {CvicenieDTO, UserDTO, UserRolesDto} from "../model/model"
import {map, Observable, switchMap, tap} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
/*import * as http from "http";*/

@Injectable({
  providedIn: 'root'
})

export class DemoService {
  private apiUrlUserCreate: string = "http://localhost:8080/fitness/api/uzivatel";
  private apiUrlUserLogin: string = "http://localhost:8080/fitness/api/login";
  constructor(private http: HttpClient) { }

  vytvorUsera(user: UserDTO): Observable<number>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic '
    });
    return this.http.post<number>(this.apiUrlUserCreate, user, {headers});
  }

  getCvicenieList(): Observable<any>{
    return this.http.get('http://localhost:8080/fitness/api/cvicenie/list');
  }
  getTreningovePlanyList() : Observable<any>{
    return this.http.get('http://localhost:8080/fitness/api/treningovyPlan/list');
  }

  login(username: string, heslo: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '
    });
    return this.http.post<any>(this.apiUrlUserLogin, { username, heslo }, { headers });
  }

  getCviceniaByPlan(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/fitness/api/treningovyPlan/cvicenia/${id}`);
  }
}
