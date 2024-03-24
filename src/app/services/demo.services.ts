import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserDTO} from "../model/model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DemoService {
  private apiUrlUser: string = "http://localhost:8080/fitness/api/uzivatel/1";

  constructor(private http: HttpClient) { }

  /*
  vytvorUsera(user: UserDTO): Observable<number>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post<number>(this.apiUrlUser, user, {headers});
  }
  */

  vytvorUsera(user: UserDTO): Observable<number> {
    const params = new HttpParams().set('user', JSON.stringify(user));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<number>(this.apiUrlUser, { params, headers });
  }
}
