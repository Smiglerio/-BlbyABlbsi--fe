import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserDTO} from "../model/model"
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DemoService {
  private apiUrlUserCreate: string = "http://localhost:8080/fitness/api/uzivatel";
  private apiUrlUserGet: string = "http://localhost:8080/fitness/api/uzivatel/1";
  private apiUrlUserLogin: string = "http://localhost:8080/fitness/api/login";

  constructor(private http: HttpClient) { }


  vytvorUsera(user: UserDTO): Observable<number>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post<number>(this.apiUrlUserCreate, user, {headers});
  }


 /* login(username: ɵValue<ɵElement<(string | ((control: AbstractControl) => (ValidationErrors | null)))[], null>> | undefined, password: ɵValue<ɵElement<string[], null>> | undefined): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      /!*'Access-Control-Allow-Origin': '*',
      'Access-Control-Resource-Sharing' : '*'*!/
    });
    return this.http.post<any>(this.apiUrlUserLogin, { username, password }, {headers});
  }*/
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrlUserLogin, { username, password }, { headers });
  }
}
